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
