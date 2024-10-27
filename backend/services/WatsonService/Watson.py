import logging
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import Embeddings
from ibm_watsonx_ai.metanames import EmbedTextParamsMetaNames as EmbedParams
from config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Watson:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Watson, cls).__new__(cls)

            credentials = Credentials(
                api_key=settings.WATSON_API_KEY, url=settings.WATSON_SERVICE_URL
            )

            embed_params = {
                EmbedParams.TRUNCATE_INPUT_TOKENS: 512,  # Adjust as needed
                EmbedParams.RETURN_OPTIONS: {"input_text": True},
            }

            try:
                cls._instance.embeddings_client = Embeddings(
                    model_id="ibm/slate-125m-english-rtrvr-v2",
                    params=embed_params,
                    credentials=credentials,
                    project_id=settings.WATSON_PROJECT_ID,
                )
                logger.info("IBM Watson Embeddings client initialized successfully.")
            except Exception as e:
                logger.error(f"Failed to initialize Embeddings client: {e}")
                raise e
        return cls._instance
    
    def get_response(self, texts):
        if texts["isFood"]:
            texts["notes"].append("Needs Food")
        if texts["isInjured"]:
            texts["notes"].append("Is Injured")
        if not texts["isSheltered"]:
            texts["notes"].append("Needs Shelter")
        return texts
    def generate_embedding(self, texts):
        try:
            response = self.embeddings_client.embed_documents(texts)
            logger.debug(f"Embeddings response: {response}")
            print("Embeddings response:", response)

            if isinstance(response, list):
                if all(isinstance(item, list) for item in response):
                    embeddings = response
                elif all(
                    isinstance(item, dict) and "embedding" in item for item in response
                ):
                    embeddings = [item["embedding"] for item in response]
                else:
                    logger.error("Unexpected items in response list.")
                    return None
            elif isinstance(response, dict) and "results" in response:
                embeddings = [item["embedding"] for item in response["results"]]
            else:
                logger.error("Unexpected response format from embeddings API.")
                return None

            logger.info(f"Generated {len(embeddings)} embeddings successfully.")
            return embeddings

        except Exception as e:
            logger.error(f"Error generating embeddings: {e}")
            return None
