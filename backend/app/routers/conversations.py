from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_current_user, get_conversation_repository
from app.repositories.conversation import ConversationRepository
from app.schemas.conversation import ConversationCreate, ConversationUpdate
from app.models.user import User

router = APIRouter(tags=['conversation'], prefix='/conversation')

@router.get("/")
async def get_conversations(
    current_user: User = Depends(get_current_user),
    repo: ConversationRepository = Depends(get_conversation_repository),
):
    return await repo.get_user_conversations(current_user.id)

@router.get("/{conversation_id}")
async def get_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    repo: ConversationRepository = Depends(get_conversation_repository),
):
    conversation = await repo.get_by_id(
        conversation_id,
        current_user.id
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    return conversation

@router.post("/")
async def create_conversation(
    data: ConversationCreate,
    current_user: User = Depends(get_current_user),
    repo: ConversationRepository = Depends(get_conversation_repository),
):
    return await repo.create(
        user_id=current_user.id,
        title=data.title,
    )

@router.patch("/{conversation_id}")
async def update_conversation(
    conversation_id: int,
    data: ConversationUpdate,
    current_user: User = Depends(get_current_user),
    repo: ConversationRepository = Depends(get_conversation_repository),
):
    conversation = await repo.get_by_id(
        conversation_id,
        current_user.id
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return await repo.update_title(
        conversation,
        data.title,
    )

@router.delete("/{conversation_id}")
async def delete_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    repo: ConversationRepository = Depends(get_conversation_repository),
):
    conversation = await repo.get_by_id(
        conversation_id,
        current_user.id,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    await repo.delete(conversation)

    return {"message": "Deleted"}
