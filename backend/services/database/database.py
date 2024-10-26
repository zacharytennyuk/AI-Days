import os
from dotenv import load_dotenv
import subprocess
import json
from pinecone import Pinecone, ServerlessSpec



load_dotenv()
class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance.initialize_project()
            cls._instance.initialize_pinecone_client()
            cls._instance.create_index()
        return cls._instance

    def initialize_project(self):
        self.projectID = os.getenv("PINECONE_API_KEY")

    def initialize_pinecone_client(self):
        self.pc = Pinecone(api_key=self.projectID)

    def create_index(self):
        index_name = "quickstart"
        self.pc.create_index(
            name=index_name,
            dimension=2,  # Replace with your model dimensions
            metric="cosine",  # Replace with your model metric
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
