from fastapi import APIRouter, UploadFile, File, Request, Depends, HTTPException
from pathlib import Path
import shutil
from uuid import uuid4
from app.services.yolov7.ModifiedPoseEstimation import watch_video
from app.services.yolov7.feedback import get_feedback
from app.services.llm.chat import generate_report
from app.dependencies import get_current_user, get_conversation_repository, get_message_repository
from app.models.user import User
from app.repositories.conversation import ConversationRepository
from app.repositories.message import MessageRepository

router = APIRouter(prefix='/video')


BASE_DIR = Path(__file__).resolve().parent.parent  

UPLOAD_DIR = BASE_DIR / "temp_saves" / "videos"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/{conversation_id}/upload")
async def upload_video(
    conversation_id: int,
    request: Request,
    arm: str,
    video_file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    conversation_repo: ConversationRepository = Depends(get_conversation_repository),
    message_repo: MessageRepository = Depends(get_message_repository),
):
    conversation = await conversation_repo.get_by_id(
        conversation_id,
        user.id,
    )
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    filename = uuid4().hex + Path(video_file.filename).suffix
    destination_path = UPLOAD_DIR / filename

    with destination_path.open("wb") as buffer:
        shutil.copyfileobj(video_file.file, buffer)

    try:
        watch = watch_video(video=destination_path)
        feedback = get_feedback(test=watch["data"], arm=arm)

        report = generate_report(feedback)

        await message_repo.create_message(
            conversation_id=conversation_id,
            role="assistant",
            content=report,
        )

        video_url = (
            str(request.base_url)[:-1]
            + f"/media/videos/{Path(watch['video']).name}"
        )

    finally:
        destination_path.unlink()

    return {
        "report": report,
        "video_url": video_url,
    }