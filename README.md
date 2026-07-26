# Personal OS

> 你的个人操作系统 — 通过长期 AI 对话，逐步构建属于你自己的数字基础设施。

## 项目愿景

Personal OS 不是另一个待办清单或笔记应用。它的目标是成为一个**随你成长的个人操作系统**：

- 🧠 **长期记忆** — AI 记住你的偏好、习惯、目标，越聊越懂你
- 🔧 **可扩展模块** — 像搭积木一样，按需添加功能模块（日程、知识库、自动化...）
- 💬 **对话驱动** — 所有操作通过自然语言完成，不需要学习复杂界面
- 🏠 **数据自主** — 你的数据归你所有，可自行部署

## 技术栈

| 层 | 技术 |
|---|------|
| 前端 | Next.js 15 + TypeScript |
| 后端 | Python FastAPI |
| 数据库 | PostgreSQL 16 |
| 部署 | Docker Compose |

## 项目结构

```
personal-os/
├── frontend/                # Next.js 前端
│   ├── src/
│   │   ├── app/            # App Router 页面
│   │   ├── components/     # UI 组件
│   │   └── lib/            # 工具函数 & API 客户端
│   └── public/             # 静态资源
├── backend/                 # FastAPI 后端
│   ├── app/
│   │   ├── routers/        # API 路由
│   │   ├── schemas/        # Pydantic 数据模型
│   │   ├── models/         # SQLAlchemy ORM 模型
│   │   ├── services/       # 业务逻辑
│   │   └── db/             # 数据库连接 & 迁移
│   ├── alembic/            # 数据库迁移
│   └── tests/              # 后端测试
├── docs/                    # 架构文档
└── docker-compose.yml       # 本地开发环境
```

## 快速开始

### 前提条件

- Node.js 18+
- Python 3.12+
- Docker & Docker Compose

### 启动开发环境

```bash
# 1. 克隆项目
git clone https://github.com/YOUR_USERNAME/personal-os.git
cd personal-os

# 2. 启动所有服务（数据库 + 后端 + 前端）
docker compose up -d

# 3. 访问
# 前端: http://localhost:3000
# 后端 API 文档: http://localhost:8000/docs
```

### 本地开发（不使用 Docker）

```bash
# 后端
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 前端（新终端）
cd frontend
npm install
npm run dev
```

## Sprint 规划

| Sprint | 目标 | 预计 |
|--------|------|------|
| **Sprint 1** | ✅ 项目脚手架、基础聊天界面、健康检查 API | 已完成 |
| Sprint 2 | 接入 LLM（Claude API）、流式对话 | 待开发 |
| Sprint 3 | 用户认证、会话持久化 | 待开发 |
| Sprint 4 | 长期记忆系统、用户画像 | 待开发 |
| Sprint 5 | 模块系统架构、首个功能模块 | 待开发 |

## 许可证

MIT
