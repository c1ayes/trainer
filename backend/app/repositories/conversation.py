from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.conversation import Conversation


class ConversationRepository:
    def __init__(self, session: Session):
        self.session = session

    async def create(self, user_id: int, title: str) -> Conversation:
        conversation = Conversation(
            user_id=user_id,
            title=title 
        )

        self.session.add(conversation)
        self.session.commit()
        self.session.refresh(conversation)

        return conversation

    async def get_user_conversations(self, user_id: int) -> list[Conversation]:
        stmt = (
            select(Conversation)
            .where(Conversation.user_id == user_id)
            .order_by(Conversation.created_at.desc())
        )

        result = self.session.execute(stmt)
        return result.scalars().all()

    async def get_by_id(
        self,
        conversation_id: int,
        user_id: int
    ) -> Conversation | None:

        stmt = (
            select(Conversation)
            .where(
                Conversation.id == conversation_id,
                Conversation.user_id == user_id
            )
        )

        result = self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def update_title(
        self,
        conversation: Conversation,
        title: str
    ) -> Conversation:

        conversation.title = title

        self.session.commit()
        self.session.refresh(conversation)

        return conversation

    async def delete(self, conversation: Conversation) -> None:
        self.session.delete(conversation)
        self.session.commit()
