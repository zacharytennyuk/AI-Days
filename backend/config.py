from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WATSON_API_KEY: str
    WATSON_SERVICE_URL: str
    WATSON_MODEL_ID: str
    WATSON_PROJECT_ID: str
    SLATE_MODEL_ID: str

    PINECONE_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
