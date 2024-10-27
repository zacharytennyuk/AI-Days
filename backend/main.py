from fastapi import FastAPI, HTTPException, Body
from services.WatsonService.Watson import Watson
from services.Database.Database import Database
from dtos.Notes import Notes

import uvicorn

app = FastAPI()
watson_instance = Watson()
database_instance = Database()

@app.post("/send_notes")
def send_notes(notes: Notes = Body(...)):
    try:
        texts = watson_instance.get_response(notes)
        if texts is None:
            raise Exception("Failed getting notes")
        return {"status": "Data inserted successfully", texts: texts}
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


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)