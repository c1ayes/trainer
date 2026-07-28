from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.message import Message

class MessageRepository:
    def __init__(self, session: Session):
        self.session = session
    async def get_by_conversation(self, conversation_id: int):
        stmt = (
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at)
        )

        result = self.session.execute(stmt)
        return result.scalars().all()
    
    async def create_message(self, content:str, conversation_id:int, role:str):
        message = Message(content = content, role = role, conversation_id = conversation_id)
        self.session.add(message)
        self.session.commit()
        self.session.refresh(message)

        return message
