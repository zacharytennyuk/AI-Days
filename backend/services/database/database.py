from pinecone import Pinecone
from config import settings


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

    def insert(self, embeddings, texts):
        try:
            data = [
                {
                    "id": str(i + self.idCount),
                    "values": embedding,
                    "metadata": {"text": text},
                }
                for i, (embedding, text) in enumerate(zip(embeddings, texts))
            ]
            self.idCount += len(embeddings)
            print(f"Total vectors inserted: {self.idCount}")

            # Upsert data into the existing Pinecone index
            self.index.upsert(vectors=data)

            return True

        except Exception as e:
            print(f"An error occurred while inserting vectors: {e}")
            return None

