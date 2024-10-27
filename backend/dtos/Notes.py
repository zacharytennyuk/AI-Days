from pydantic import BaseModel
from typing import List

class Notes(BaseModel):
    isFood: bool
    isInjured: bool
    isSheltered: bool
    notes: List[str]