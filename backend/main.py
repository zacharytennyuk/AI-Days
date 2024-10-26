from services.WatsonService.Watson import Watson
from services.ImageService import ImageService
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import uvicorn
import shutil
import os

app = FastAPI()

watsonIinstance = Watson()
imageService = ImageService()
SAVE_DIRECTORY = "./files"
if not os.path.exists(SAVE_DIRECTORY):
    os.makedirs(SAVE_DIRECTORY)

@app.get("/")
async def read_root():
    watsonIinstance.queryPrompt()
    return {"Hello": "World"}

@app.post("/process")
async def process_image(file: UploadFile = File()):
    success = await imageService.processImage(file)


    if success:
        return JSONResponse(content={"Success": "Success"})
    else:
        return JSONResponse(content={"Error": "Failed to process image"}, status_code=500)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)