import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec


load_dotenv()
class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance.api_key = os.getenv("PINECONE_API_KEY")  # Load the API key from environment
            cls._instance.pc = Pinecone(api_key=cls._instance.api_key)
            cls._instance.index = cls._instance.pc.Index("quickstart")
        return cls._instance

    def insert(self):
        self.index.upsert(
            vectors=[
                {
                    "id": "vec1", 
                    "values": [1.0, 1.5], 
                    "metadata": {"genre": "drama"}
                }, {
                    "id": "vec2", 
                    "values": [2.0, 1.0], 
                    "metadata": {"genre": "action"}
                }, {
                    "id": "vec3", 
                    "values": [0.1, 0.3], 
                    "metadata": {"genre": "drama"}
                }, {
                    "id": "vec4", 
                    "values": [1.0, -2.5], 
                    "metadata": {"genre": "action"}
                }
            ],
            namespace= "ns1"
    )
    