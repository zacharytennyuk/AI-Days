from pinecone import Pinecone
from config import settings
import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)

            cls._instance.pc = Pinecone(api_key=settings.PINECONE_API_KEY)

            index_name = "preppal"
            existing_indexes = [index.name for index in cls._instance.pc.list_indexes()]

            if index_name not in existing_indexes:
                raise ValueError(
                    f"Index '{index_name}' does not exist. Please create it first."
                )

            cls._instance.index = cls._instance.pc.Index(index_name)
        return cls._instance

    def __init__(self):
        self.idCount = 0

    def insert(self, data):
        try:
            response = self.index.upsert(
                vectors=data, namespace="disaster_preparedness"
            )
            logger.info(f"Pinecone upsert response: {response}")
            return True
        except Exception as e:
            logger.error(f"Error inserting embeddings into Pinecone: {e}")
            return False
