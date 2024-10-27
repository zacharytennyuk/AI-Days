from fastapi import FastAPI, HTTPException, Body
from services.WatsonService.Watson import Watson
from services.database.Database import Database
from dtos.Notes import Notes
import logging

import uvicorn

app = FastAPI()
watson_instance = Watson()
database_instance = Database()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.post("/insert")
def insert_data(notes: Notes = Body(...)):
    try:
        embeddings = watson_instance.get_response(texts)
        vectors = database_instance.insert(embeddings)
        if vectors is None:
            raise Exception("Failed to generate embeddings")
        database_instance.insert(embeddings, texts)
        return {"status": "Data inserted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/embed")
def generate_embeddings(texts: list[str] = Body(...)):
    if not texts:
        raise HTTPException(status_code=400, detail="No texts provided for embedding.")
    embeddings = watson_instance.generate_embedding(texts)
    if embeddings is None:
        raise HTTPException(status_code=500, detail="Failed to generate embeddings.")
    return {"embeddings": embeddings}


@app.post("/retrieve")
def retrieve(query: str = Body(..., embed=True)):
    if not query:
        raise HTTPException(status_code=400, detail="No query provided.")

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

    relevant_chunks = retrieve_relevant_chunks(query)
    if not relevant_chunks:
        raise HTTPException(status_code=404, detail="No relevant chunks found.")

    return {"relevant_chunks": relevant_chunks}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
