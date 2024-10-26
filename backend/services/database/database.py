import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
import numpy as np

load_dotenv()

class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance.api_key = os.getenv("PINECONE_API_KEY")  # Load the API key from environment
            cls._instance.pc = Pinecone(api_key=cls._instance.api_key)
            cls._instance.index = cls._instance.pc.Index("quickstart")  # Access the Pinecone index
        return cls._instance

    def insert(self, vector):
        # Prepare the data in the required format
        data = [
            {"id": str(i), "values": vector.tolist()}
            for i, vector in enumerate(vectors)
        ]


        self.index.upsert(
            vectors=data,
            namespace="ns1"
        )
    
    def generateVector(self):
        num_vectors = 10
        dimension = 768
        vectors = np.random.rand(num_vectors, dimension)
        return vectors

