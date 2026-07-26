from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import chat

app = FastAPI(title=settings.app_name, version="0.1.0")

# CORS — 允许前端开发时跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": f"欢迎使用 {settings.app_name}"}
