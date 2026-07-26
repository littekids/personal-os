"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );
      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "抱歉，我暂时无法回复。",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "连接失败，请确保后端服务已启动。" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1>Personal OS</h1>
        <span style={styles.subtitle}>你的个人操作系统</span>
      </header>

      <section style={styles.chatArea}>
        {messages.length === 0 && (
          <p style={styles.placeholder}>
            开始对话，建立你的个人操作系统。
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#2563eb" : "#1e1e1e",
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.message, alignSelf: "flex-start", background: "#1e1e1e" }}>
            思考中...
          </div>
        )}
      </section>

      <footer style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="输入你的想法..."
          disabled={loading}
        />
        <button style={styles.sendBtn} onClick={sendMessage} disabled={loading}>
          发送
        </button>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxWidth: 700,
    margin: "0 auto",
    padding: "16px",
  },
  header: {
    textAlign: "center" as const,
    padding: "12px 0 24px",
    borderBottom: "1px solid #2a2a2a",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "16px 0",
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },
  placeholder: {
    textAlign: "center" as const,
    color: "#666",
    marginTop: 80,
  },
  message: {
    maxWidth: "80%",
    padding: "10px 16px",
    borderRadius: 12,
    fontSize: 15,
    lineHeight: 1.6,
    whiteSpace: "pre-wrap" as const,
  },
  inputArea: {
    display: "flex",
    gap: 8,
    padding: "12px 0",
    borderTop: "1px solid #2a2a2a",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "#e0e0e0",
    fontSize: 15,
    outline: "none",
  },
  sendBtn: {
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },
};
