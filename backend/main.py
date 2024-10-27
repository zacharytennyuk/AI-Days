from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from services.WatsonService.Watson import Watson
from services.Database.Database import Database
from dtos.Notes import Notes
from services.WatsonService.AnswerGeneration import AnswerGeneration
from dtos.QueryRequest import QueryRequest
import logging
import uvicorn

app = FastAPI()
watson_instance = Watson()
database_instance = Database()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust as needed for allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
@app.post("/send_notes")
async def send_notes(notes: Notes):
    try:
        # Log the incoming data
        print("Received notes:", notes)

        # Process or save the data as required
        # Here we're simulating a response based on the content of the notes
        response_message = "Here's some assistance based on your requirements:"
        if notes.isFood:
            response_message += " Assistance for food is available."
        if notes.isInjured:
            response_message += " Assistance for injuries is available."
        if notes.isSheltered:
            response_message += " Sheltering assistance is available."

        # Add any other specific processing if needed
        return {"message": response_message}

    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing the notes.") from e

def generate_answer(query_text, relevant_chunks):
    ans_model = AnswerGeneration()

    max_chunks = 3
    context_chunks = relevant_chunks[:max_chunks]

    context = ""
    for idx, chunk in enumerate(context_chunks, start=1):
        chunk_text = chunk["metadata"].get("text")
        if not chunk_text:
            logger.warning(
                f"No 'text' found in metadata for chunk ID {chunk['id']}. Skipping."
            )
            continue
        context += f"Source {idx}:\n{chunk_text}\n\n"

    if not context.strip():
        logger.error("No valid context could be constructed from the retrieved chunks.")
        return "I'm sorry, but I couldn't find relevant information to answer your question."

    max_chunks = 3
    context_chunks = relevant_chunks[:max_chunks]

    context = ""
    for idx, chunk in enumerate(context_chunks, start=1):
        context += f"Source {idx}:\n{chunk['metadata']['text']}\n\n"

    prompt = f"""
You are an expert assistant providing information on disaster preparedness.

Please provide a concise and accurate answer to the following question using the information from the provided sources.

{context}
Question: {query_text}
Answer:
"""

    answer = ans_model.generate_text(prompt=prompt)

    if answer:
        return answer.strip()
    else:
        logger.error("Failed to generate an answer using the LLM.")
        return "boom skibidi good luck"


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
