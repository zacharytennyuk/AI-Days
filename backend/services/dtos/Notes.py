from pydantic import BaseModel
from typing import List

class Notes(BaseModel):
    disaster: str
    foodWater: bool
    information: str
    injury: bool
    shelter: bool
    
    