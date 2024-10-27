import requests
import json
from config import settings
import logging
import urllib.parse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Watson:
    _instance = None  # singleton

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Watson, cls).__new__(cls)
            cls._instance.api_key = settings.WATSON_API_KEY
            cls._instance.service_url = settings.WATSON_SERVICE_URL
            cls._instance.project_id = settings.WATSON_PROJECT_ID
            cls._instance.model_id = "ibm/slate-large-model"
            cls._instance.slate_model_id = "ibm/slate-125m-english-rtrvr-v2"
        return cls._instance

    def generate_embedding(self, texts):
        encoded_model_id = urllib.parse.quote(self.slate_model_id, safe="")
        url = f"{self.service_url}/ml/v1/models/{encoded_model_id}/embeddings?version=2024-07-25"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        data = {
            "input": texts,
            "model_id": self.slate_model_id,
            "project_id": self.project_id,
        }

        try:
            response = requests.post(url, headers=headers, json=data)
            logger.debug(f"Request URL: {url}")
            logger.debug(f"Request Headers: {headers}")
            logger.debug(f"Request Body: {json.dumps(data)}")
            logger.debug(f"Response Status Code: {response.status_code}")
            logger.debug(f"Response Text: {response.text}")
            response.raise_for_status()
            result = response.json()
            embeddings = [item["embedding"] for item in result["predictions"]]
            return embeddings
        except requests.exceptions.RequestException as e:
            logger.error(f"Error generating embeddings: {e}", exc_info=True)
            return None
