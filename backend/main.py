import os
from fastapi import FastAPI, HTTPException, Body
from services.WatsonService.Watson import Watson
from services.Database.Database import Database
from services.WatsonService.AnswerGeneration import AnswerGeneration
from dtos.QueryRequest import QueryRequest
import logging
import uvicorn

app = FastAPI()
watson_instance = Watson()
database_instance = Database()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


@app.post("/embed")
def generate_embeddings(texts: list[str] = Body(...)):
    if not texts:
        raise HTTPException(status_code=400, detail="No texts provided for embedding.")
    embeddings = watson_instance.generate_embedding(texts)
    if embeddings is None:
        raise HTTPException(status_code=500, detail="Failed to generate embeddings.")
    return {"embeddings": embeddings}


@app.post("/retrieve")
def retrieve(request: QueryRequest):
    query = request.query
    if not query:
        raise HTTPException(status_code=400, detail="No query provided.")

    relevant_chunks = retrieve_relevant_chunks(query)
    if not relevant_chunks:
        raise HTTPException(status_code=404, detail="No relevant chunks found.")

    return {"relevant_chunks": relevant_chunks}


def retrieve_relevant_chunks(query_text, top_k=5):
    query_embedding = watson_instance.generate_embedding([query_text])
    if query_embedding is None or len(query_embedding) == 0:
        logger.error("Failed to generate embedding for the query text.")
        return []

    matches = database_instance.query(
        vector=query_embedding[0], top_k=top_k, namespace="disaster_preparedness"
    )

    relevant_chunks = []
    for match in matches:
        chunk_data = {
            "id": match.get("id", ""),
            "score": match.get("score", 0),
            "metadata": match.get("metadata", {}),
        }
        relevant_chunks.append(chunk_data)

    return relevant_chunks


@app.post("/answer")
def answer(request: QueryRequest):
    query = request.query
    if not query:
        raise HTTPException(status_code=400, detail="No query provided.")

    relevant_chunks = retrieve_relevant_chunks(query)
    if not relevant_chunks:
        raise HTTPException(status_code=404, detail="No relevant information found.")

    answer_text = generate_answer(query, relevant_chunks)
    if not answer_text:
        raise HTTPException(status_code=500, detail="Failed to generate an answer.")

    return {"answer": answer_text}


def generate_answer(query_text, relevant_chunks):
    ans = AnswerGeneration()

    max_chunks = 3
    context_chunks = relevant_chunks[:max_chunks]

    context = ""
    documents = []
    for idx, chunk in enumerate(context_chunks, start=1):
        chunk_text = chunk["metadata"].get("text", "")
        if not chunk_text:
            logger.warning(
                f"No 'text' found in metadata for chunk ID {chunk['id']}. Skipping."
            )
            continue

        source_path = chunk["metadata"].get("source", "")
        logger.info(f"Source Path: {source_path}")
        document_name = os.path.basename(source_path).replace(".txt", "")
        logger.info(f"Document Name: {document_name}")

        if document_name not in documents:
            documents.append(document_name)

        context += f"Source {idx} ({document_name}):\n{chunk_text}\n\n"

    if not context.strip():
        logger.error("No valid context could be constructed from the retrieved chunks.")
        return {
            "answer": "I'm sorry, but I couldn't find relevant information to answer your question.",
            "documents": [],
        }

    prompt = f"""
You are an expert assistant providing information on disaster preparedness.

Please provide a concise and accurate answer to the following question using the information from the provided sources.

{context}
Question: {query_text}
Answer:
"""

    generated_text = ans.generate_text(prompt=prompt)

    if generated_text:
        return {"answer": generated_text.strip(), "documents": documents}
    else:
        logger.error("Failed to generate an answer using the Granite model.")
        return {
            "answer": "Good luck, buddy!",
            "documents": documents,
        }


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
