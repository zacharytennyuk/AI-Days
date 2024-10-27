from pydantic import BaseModel
from typing import List

class Notes(BaseModel):
    foodWater: bool
    injury: bool
    shelter: bool
    information: str
    disaster: str