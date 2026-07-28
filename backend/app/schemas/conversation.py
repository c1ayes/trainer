from pydantic import BaseModel

class ConversationCreate(BaseModel):
    title: str

class ConversationUpdate(BaseModel):
    title: str