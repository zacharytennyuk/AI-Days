from services.WatsonService.Watson import Watson
from services.Database.Database import Database
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import uvicorn
import os


load_dotenv()
app = FastAPI()

watsonInstance = Watson()
databaseInstance = Database()

SAVE_DIRECTORY = "./files"
if not os.path.exists(SAVE_DIRECTORY):
    os.makedirs(SAVE_DIRECTORY)

@app.get("/")
def read_root():
    watsonInstance.queryPrompt()
    return {"Hello": "World"}

@app.get("/insert")
def insert_query():
    res = databaseInstance.process()
    return res
    

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)