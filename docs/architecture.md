# Personal OS 架构设计

## 整体架构

```
┌──────────────┐     HTTP/REST      ┌──────────────┐     SQL      ┌──────────────┐
│   Frontend   │  ◄──────────────►  │   Backend    │  ◄────────►  │  PostgreSQL  │
│  Next.js 15  │                    │  FastAPI     │              │     16       │
└──────────────┘                    └──────────────┘              └──────────────┘
                                          │
                                          │ API
                                          ▼
                                   ┌──────────────┐
                                   │  AI Service  │
                                   │  (Sprint 2)  │
                                   └──────────────┘
```

## 前端架构

- **路由**: Next.js App Router
- **状态管理**: Sprint 1 使用 React useState，后续按需引入 Zustand
- **样式**: CSS-in-JS (inline styles) → Sprint 3 迁移到 Tailwind CSS
- **API 通信**: 直接 fetch → Sprint 3 引入 React Query 管理缓存

## 后端架构

- **分层设计**:
  - `routers/` — HTTP 请求处理，参数校验
  - `services/` — 业务逻辑
  - `models/` — 数据库 ORM
  - `schemas/` — API 数据模型
  - `db/` — 数据库连接和会话管理

## 数据库表设计（规划）

| 表名 | 用途 | Sprint |
|------|------|--------|
| users | 用户账户 | Sprint 3 |
| conversations | 对话会话 | Sprint 3 |
| messages | 聊天消息 | Sprint 3 |
| memories | 长期记忆条目 | Sprint 4 |
| user_profile | 用户画像 | Sprint 4 |
| modules | 功能模块注册 | Sprint 5 |

## 设计原则

1. **渐进增强** — 每个 Sprint 只添加必要的复杂度
2. **数据主权** — 用户可导出全部数据
3. **可扩展** — 模块系统允许插件式扩展
4. **离线友好** — 核心功能不依赖外部服务（除 AI API）
