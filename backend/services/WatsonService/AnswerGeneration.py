import logging
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from ibm_watsonx_ai.foundation_models.utils.enums import ModelTypes, DecodingMethods
from config import settings

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class AnswerGeneration:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AnswerGeneration, cls).__new__(cls)

            try:
                credentials = Credentials(
                    api_key=settings.WATSON_API_KEY, url=settings.WATSON_SERVICE_URL
                )

                parameters = {
                    GenParams.DECODING_METHOD: DecodingMethods.GREEDY,
                    GenParams.MAX_NEW_TOKENS: 512,  # TODO: adjust
                    GenParams.MIN_NEW_TOKENS: 1,
                    GenParams.TEMPERATURE: 0.7,
                    GenParams.TOP_K: 50,
                    GenParams.TOP_P: 0.95,
                    GenParams.REPETITION_PENALTY: 1.0,
                }

                cls._instance.model_client = ModelInference(
                    model_id=ModelTypes.GRANITE_13B_INSTRUCT_V2,
                    params=parameters,
                    credentials=credentials,
                    project_id=settings.WATSON_PROJECT_ID,
                )

                logger.info("LLM client initialized successfully.")

            except Exception as e:
                logger.error(f"Failed to initialize LLM client: {e}")
                raise e

        return cls._instance

    def generate_text(self, prompt):
        try:
            response = self.model_client.generate_text(prompt=prompt)
            logger.debug(f"LLM response: {response}")
            return response.strip()

        except Exception as e:
            logger.error(f"Error generating text with LLM: {e}")
            return None
