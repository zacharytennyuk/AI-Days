from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from services.places.places import search_nearby_places
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter()


class TextSearchData(BaseModel):
    query: str = Field(..., example="hospital in New York")
    location: tuple = Field(None, example=(40.7128, -74.0060))
    radius: int = Field(None, example=5000)


@router.post("/search-place")
async def get_text_search_places(search_data: TextSearchData):
    """
    Endpoint to retrieve places based on a text search query.
    """
    try:
        # Call the search function from places.py
        results = search_nearby_places(
            query=search_data.query,
            location=search_data.location,
            radius=search_data.radius,
        )
        return {"places": results}
    except Exception as e:
        logger.error(f"Error fetching places via text search: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve places")
