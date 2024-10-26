from services.WatsonService.Watson import Watson
from services.database.database import Database
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import uvicorn
import os


load_dotenv()
app = FastAPI()

watson_instance = Watson()
database_instance = Database()

SAVE_DIRECTORY = "./files"
os.makedirs(SAVE_DIRECTORY, exist_ok=True)


@app.get("/")
def read_root():
    response = watson_instance.query_prompt()
    if "error" in response:
        raise HTTPException(status_code=500, detail=response["error"])
    return {"response": response}


@app.get("/insert")
def insert_data():
    try:
        database_instance.insert()
        return {"status": "Data inserted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# TODO - endpoint to recieve data from frontend to send to LLM



if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
