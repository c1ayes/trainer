from app.database.database import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from app.auth import verify_token 
from sqlalchemy.orm import Session
from app.models.user import User

from fastapi import Depends
from app.repositories.conversation import ConversationRepository
from app.repositories.message import MessageRepository

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    payload = verify_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(status_code=401)
    user = db.query(User).filter(User.id == int(payload["sub"])).first()

    if not user:
        raise HTTPException(status_code=401)

    return user

def get_conversation_repository(
    session: Session = Depends(get_db),
):
    return ConversationRepository(session)

def get_message_repository(
    session: Session = Depends(get_db),
):
    return MessageRepository(session)
