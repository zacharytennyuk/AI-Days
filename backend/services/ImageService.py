import requests
from fastapi import UploadFile

class ImageService:
    _instance = None  # Private class variable to hold the single instance

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ImageService, cls).__new__(cls)
        return cls._instance

    async def processImage(self, img: UploadFile):
        try:
            url = "http://localhost:8001"
            image_data = await img.read()
            files = {'image': image_data}
            response = requests.post(url, files=files)

            if response.status_code == 200:
                print("Image sent successfully")
            else:
                print("Failed to send image", response.status_code)

            return response.status_code == 200

        except Exception as e:
            print("An error occurred:", e)
            return True