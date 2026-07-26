const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendMessage(message: string): Promise<{ reply: string }> {
  const res = await fetch(`${API_BASE}/api/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function healthCheck(): Promise<{ status: string }> {
  const res = await fetch(`${API_BASE}/api/v1/health`);
  return res.json();
}
