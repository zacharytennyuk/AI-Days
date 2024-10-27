import requests
import json
from config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Watson:
    _instance = None  # singleton

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Watson, cls).__new__(cls)
            cls._instance.api_key = settings.WATSON_API_KEY
            cls._instance.service_url = settings.WATSON_SERVICE_URL
            cls._instance.model_id = settings.WATSON_MODEL_ID
            cls._instance.project_id = settings.WATSON_PROJECT_ID
            cls._instance.slate_model_id = settings.SLATE_MODEL_ID
        return cls._instance

    def query_prompt(self, prompt="Say Hello World"):
        data = {
            "input": prompt,
            "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": 900,
                "min_new_tokens": 0,
                "stop_sequences": [],
                "repetition_penalty": 1,
            },
            "model_id": self.model_id,
            "project_id": self.project_id,
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            response = requests.post(
                f"{self.service_url}/ml/v1/text/generation?version=2023-05-29",
                headers=headers,
                data=json.dumps(data),
            )
            response.raise_for_status()
            result = response.json()
            print(result)
            return result
        except requests.exceptions.RequestException as e:
            print(f"Error querying Watson: {e}")
            return {"error": str(e)}
        
        

    def generate_embedding(self, texts):
        """
        generate embeddings for a list of texts using the slate model.

        :param: texts list of text strings to embed
        :return: list of embedding vectors
        """
        url = f"{self.service_url}/ml/v1/embeddings?version=2022-06-01"
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
            response.raise_for_status()
            result = response.json()
            embeddings = [item["embedding"] for item in result["data"]]
            return embeddings
        except requests.exceptions.RequestException as e:
            logger.error(f"Error generating embeddings: {e}")
            return None
