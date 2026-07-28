from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_current_user, get_conversation_repository, get_message_repository
from app.repositories.conversation import ConversationRepository
from app.repositories.message import MessageRepository
from app.models.user import User
from app.services.llm.chat import generate_response
from app.schemas.message import MessageCreate

router = APIRouter(tags=['messages'])

@router.get("/{conversation_id}/messages")
async def get_messages(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    conversation_repo: ConversationRepository = Depends(get_conversation_repository),
    message_repo: MessageRepository = Depends(get_message_repository),
):
    conversation = await conversation_repo.get_by_id(
    conversation_id,
    current_user.id,
    )
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    messages = await message_repo.get_by_conversation(conversation.id)
    return messages

@router.post("/messages")
async def send_message(
    data: MessageCreate,
    message_repo: MessageRepository = Depends(get_message_repository),
    conversation_repo: ConversationRepository = Depends(get_conversation_repository),
    current_user: User = Depends(get_current_user),
):
    if data.conversation_id is None:

        conversation = await conversation_repo.create(
            user_id=current_user.id,
            title=data.content,
        )

    else:

        conversation = await conversation_repo.get_by_id(
            data.conversation_id,
            current_user.id,
        )

        if conversation is None:
            raise HTTPException(
                status_code=404,
                detail="Conversation not found",
            )

    await message_repo.create_message(
        conversation_id=conversation.id,
        role="user",
        content=data.content,
    )

    messages = await message_repo.get_by_conversation(
        conversation.id,
    )

    answer = generate_response(messages)

    await message_repo.create_message(
        conversation_id=conversation.id,
        role="assistant",
        content=answer,
    )

    return {
        "conversation_id": conversation.id,
        "answer": answer,
    }