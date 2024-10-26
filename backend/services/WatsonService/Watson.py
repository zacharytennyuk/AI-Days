import json
from config import settings


class Watson:
    _instance = None  # Private class variable to hold the single instance

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Watson, cls).__new__(cls)
            cls._instance.api_key = settings.WATSON_API_KEY
            cls._instance.service_url = settings.WATSON_SERVICE_URL
            cls._instance.model_id = settings.WATSON_MODEL_ID
            cls._instance.project_id = settings.WATSON_PROJECT_ID
        return cls._instance

    def getTranslation(self):
        translation = self.language_translator.translate(text="Hello, world!",model_id='en-es').get_result()
        print(translation)


    def queryPrompt(self, prompt="Say Hello World"):

        data = {
            "input": prompt,
            "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": 900,
                "min_new_tokens": 0,
                "stop_sequences": [],
                "repetition_penalty": 1
            },
            "model_id": self.modelID,
            "project_id": self.projectID
        }

        curl_command = [
            "curl", "-X", "POST", "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29",
            "--header", f"Authorization: Bearer {self.key}",
            "--header", "Content-Type: application/json",
            "--data", json.dumps(data)
        ]
        
        result = subprocess.run(curl_command, capture_output=True, text=True)

        print(result.stdout)
        if result.stderr:
            print("Error:", result.stderr)
