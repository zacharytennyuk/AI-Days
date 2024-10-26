from services.WatsonService.Watson import Watson
from fastapi import FastAPI
import uvicorn

app = FastAPI()


watson_instance = Watson("Key")

@app.get("/")
async def read_root():
    # Use the already initialized singleton instance
    watson_instance.getKey()
    return {"Hello": "World"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
