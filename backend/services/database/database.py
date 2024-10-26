import os
from pinecone import Pinecone, ServerlessSpec
import numpy as np


class Database:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance.key = os.getenv("PINECONE_API_KEY")  # Load the API key from environment
            cls._instance.pc = Pinecone(api_key=cls._instance.key)
            cls._instance.index = cls._instance.pc.Index("quickstart")  # Access the Pinecone index
        return cls._instance

    def __init__(self):
        self.idCount = 0

    def process(self):
        vectors = self.generateVector()
        res = self.insert(vectors)
        print(self.getRecordCount())
        print(self.key)
        return res


    
    def insert(self, vectors):
        # Prepare the data in the required format
        data = [
            {"id": str(i+self.idCount), "values": vector.tolist()}
            for i, vector in enumerate(vectors)
        ]
        self.idCount += len(vectors)
        print(self.idCount)

        self.index.upsert(
            vectors=data,
            namespace="ns1"
        )
        
        return True
    
    def getRecordCount(self):
            # Prepare the data in the required format
        # Get the total record count

        index_stats = self.index.describe_index_stats()
        total_records = index_stats['namespaces'].get("ns1", {}).get("vector_count", 0)
        
        return total_records

            
    
    def generateVector(self):
        num_vectors = 500
        dimension = 768
        vectors = np.random.rand(num_vectors, dimension)
        return vectors

