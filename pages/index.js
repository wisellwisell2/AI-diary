
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [diary, setDiary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setDiary("");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic })
    });
    const data = await response.json();
    setDiary(data.diary);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>写メ日記自動生成</h1>
      <textarea
        placeholder="今日書きたいこと（任意）"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", height: 80, marginBottom: 10, padding: 10 }}
      />
      <button onClick={handleGenerate} disabled={loading} style={{ padding: 10, background: "#f08", color: "#fff", border: "none", width: "100%" }}>
        {loading ? "生成中..." : "生成する"}
      </button>
      <div style={{ marginTop: 20, whiteSpace: "pre-wrap", background: "#eee", padding: 10, borderRadius: 5 }}>
        {diary}
      </div>
    </div>
  );
}
