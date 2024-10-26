from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Watson
    WATSON_API_KEY: str
    WATSON_SERVICE_URL: str
    WATSON_MODEL_ID: str
    WATSON_PROJECT_ID: str

    # Slate
    SLATE_MODEL_ID: str

    # Pinecone
    PINECONE_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
