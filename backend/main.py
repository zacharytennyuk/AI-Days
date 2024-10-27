from services.WatsonService.Watson import Watson
from services.database.database import Database
from fastapi import FastAPI, HTTPException, Body
import uvicorn

app = FastAPI()

watson_instance = Watson()
database_instance = Database()


@app.get("/")
def read_root():
    response = watson_instance.query_prompt()
    if "error" in response:
        raise HTTPException(status_code=500, detail=response["error"])
    return {"response": response}


@app.post("/insert")
def insert_data(texts: list[str] = Body(...)):
    try:
        # Generate embeddings
        embeddings = watson_instance.generate_embedding(texts)
        if embeddings is None:
            raise Exception("Failed to generate embeddings")
        # Insert embeddings into Pinecone
        database_instance.insert(embeddings, texts)
        return {"status": "Data inserted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
