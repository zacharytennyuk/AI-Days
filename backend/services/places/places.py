# services/places/places.py
from fastapi import FastAPI, HTTPException
from typing import Optional
import googlemaps
from config import settings

# Initialize the Google Maps client with the API key
gmaps = googlemaps.Client(key=settings.GOOGLE_PLACES_API_KEY)

def search_nearby_places(query, location=None, radius=5000):

    if location:
        location_str = f"{location[0]},{location[1]}"
        places_result = gmaps.places(query=query, location=location_str, radius=radius)
    else:
        places_result = gmaps.places(query=query)

    results = []

    # Extract relevant data for each place
    for place in places_result.get("results", []):
        place_info = {
            "name": place.get("name"),
            "address": place.get("formatted_address"),
            "latitude": place["geometry"]["location"]["lat"],
            "longitude": place["geometry"]["location"]["lng"],
            "rating": place.get("rating"),
            "user_ratings_total": place.get("user_ratings_total")
        }
        results.append(place_info)
    
    return results
