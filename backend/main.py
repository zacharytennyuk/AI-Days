from services.WatsonService.Watson import Watson
from services.database.database import Database
from fastapi import FastAPI, HTTPException, Body
import uvicorn

app = FastAPI()

watson_instance = Watson()
database_instance = Database()


@app.post("/insert")
def insert_data(texts: list[str] = Body(...)):
    try:
        embeddings = watson_instance.generate_embedding(texts)
        if embeddings is None:
            raise Exception("Failed to generate embeddings")
        database_instance.insert(embeddings, texts)
        return {"status": "Data inserted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
