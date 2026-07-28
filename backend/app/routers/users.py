from fastapi import APIRouter, Depends, HTTPException, Response, Cookie
from app.schemas.user import UserRegister, UserResponse, LoginSchema
from app.models.user import User
from sqlalchemy.orm import Session
from app.auth import hash_password, verify_password, verify_token, create_access_token, create_refresh_token
from app.dependencies import get_db
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter(tags=['users'])

@router.post('/register', response_model=UserResponse)
def register(user:UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username.lower()).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_user = User(username = user.username.lower(), hashed_password = hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post('/login')
def login(user:LoginSchema, response: Response, db:Session = Depends(get_db)):
    username = user.username.strip().lower()
    existing_user = db.query(User).filter(User.username == username).first()
    if not existing_user:
        raise HTTPException(status_code=401, detail="User doesn't exist")
    check = verify_password(user.password, existing_user.hashed_password)
    if not check:
        raise HTTPException(status_code=401)
    access_token = create_access_token({'sub': str(existing_user.id), 'type': 'access'})
    refresh_token = create_refresh_token({'sub': str(existing_user.id), 'type': 'refresh'})
    existing_user.refresh_token = refresh_token
    db.commit()

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,     
        samesite="lax",
        max_age=60 * 60 * 24 * 30,   # 30 дней
    )
    return {'access_token': access_token, "token_type": 'bearer'}

refresh_scheme = OAuth2PasswordBearer(tokenUrl='login')

@router.post('/refresh')
def refresh(refresh_token:str | None = Cookie(default=None), db:Session = Depends(get_db)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token is missing")

    payload = verify_token(refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token type")
    user = db.query(User).filter(User.id == payload['sub']).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.refresh_token == refresh_token:
        access_token = create_access_token({'sub': str(user.id), 'type': 'access'})
        return {'access_token':access_token}
    raise HTTPException(status_code=401, detail="Token mismatch or revoked")

@router.post("/logout")
def logout(
    response: Response,
    refresh_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db)
):
    if refresh_token:
        user = db.query(User).filter(
            User.refresh_token == refresh_token
        ).first()

        if user:
            user.refresh_token = None
            db.commit()

    response.delete_cookie("refresh_token")

    return {"message": "Logged out"}
