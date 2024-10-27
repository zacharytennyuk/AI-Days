from fastapi import FastAPI, HTTPException, Body
from services.WatsonService.Watson import Watson
import uvicorn

app = FastAPI()
watson_instance = Watson()


@app.post("/embed")
def generate_embeddings(texts: list[str] = Body(...)):
    if not texts:
        raise HTTPException(status_code=400, detail="No texts provided for embedding.")
    embeddings = watson_instance.generate_embedding(texts)
    if embeddings is None:
        raise HTTPException(status_code=500, detail="Failed to generate embeddings.")
    return {"embeddings": embeddings}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

from services.WatsonService.Watson import Watson
from services.Database.Database import Database
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
    
@app.post("/send-notes")
def send_notes(texts: list[str] = Body(...)):
    try:
        notes = watson_instance.sendNotes(texts)
        if notes is None:
            raise Exception("Failed to Retrieve Notes")
        return {"status": "Data inserted successfully", "notes": notes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/embed")
def generate_embeddings(texts: list[str] = Body(...)):
    embeddings = watson_instance.generate_embedding(texts)
    if embeddings is None:
        raise HTTPException(status_code=500, detail="Failed to generate embeddings")
    return {"embeddings": embeddings}

@app.post("/embed")
def generate_embeddings(texts: list[str] = Body(...)):
    embeddings = watson_instance.generate_embedding(texts)
    if embeddings is None:
        raise HTTPException(status_code=500, detail="Failed to generate embeddings")
    return {"embeddings": embeddings}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
