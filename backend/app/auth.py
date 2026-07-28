from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv

pwd_context = CryptContext(schemes=['bcrypt'], bcrypt__truncate_error = False)

def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(password:str, hashed:str):
    return pwd_context.verify(password,hashed)

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def create_access_token(data:dict):
    payload = data.copy()
    payload['exp'] = datetime.now(timezone.utc) + timedelta(hours=1)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str | None):
    if not token:
        return None

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
def create_refresh_token(data:dict):
    payload = data.copy()
    payload['exp'] = datetime.now(timezone.utc) + timedelta(days=30)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
