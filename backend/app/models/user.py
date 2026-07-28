from app.database.database import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.conversation import Conversation

class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    refresh_token: Mapped[str] = mapped_column(nullable=True)

    conversations: Mapped[list["Conversation"]] = relationship(
        back_populates="user"
    )