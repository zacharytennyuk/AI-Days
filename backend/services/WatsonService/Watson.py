import logging
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import Embeddings
from ibm_watsonx_ai.metanames import EmbedTextParamsMetaNames as EmbedParams
from config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Watson:
    _instance = None  # singleton instance

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Watson, cls).__new__(cls)

            credentials = Credentials(
                api_key=settings.WATSON_API_KEY, url=settings.WATSON_SERVICE_URL
            )

            embed_params = {
                EmbedParams.TRUNCATE_INPUT_TOKENS: 512,
                EmbedParams.RETURN_OPTIONS: {"input_text": True},
            }

            cls._instance.embeddings_client = Embeddings(
                model_id="ibm/slate-125m-english-rtrvr-v2",
                params=embed_params,
                credentials=credentials,
                project_id=settings.WATSON_PROJECT_ID,
            )
        return cls._instance

    def generate_embedding(self, texts):
        try:
            response = self.embeddings_client.embed_documents(texts)
            embeddings = [item["embedding"] for item in response["predictions"]]
            return embeddings
        except Exception as e:
            logger.error(f"Error generating embeddings: {e}")
            return None
