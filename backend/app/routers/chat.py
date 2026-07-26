from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(tags=["chat"])


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """
    MVP 聊天接口 — 当前返回占位回复。
    后续 Sprint 将接入 AI 模型。
    """
    reply = f"已收到你的消息：「{req.message}」\n\nPersonal OS 正在建设中，AI 对话功能将在下一个 Sprint 中接入。"
    return ChatResponse(reply=reply)
