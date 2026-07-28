from fastapi import FastAPI
from .routers import video, users, conversations, messages
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi.staticfiles import StaticFiles

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent

app.mount(
    "/media/videos",
    StaticFiles(directory=BASE_DIR / "temp_saves" / "videos"),
    name="videos",
)


app.include_router(video.router)
app.include_router(users.router)
app.include_router(conversations.router)
app.include_router(messages.router)