
export default async function handler(req, res) {
  console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "API key not set" });
  }

  const { topic } = req.body;

  const lengths = [15, 100, 200, 400, 800];
  const length = lengths[Math.floor(Math.random() * lengths.length)];

  const systemPrompt = "あなたは明るく親しみやすいデリヘル嬢『ことぶき』風のキャラで、男性ユーザーが読んで楽しい写メ日記を作るプロです。ギャル系やギャル語・絵文字・ユーモアを自然に取り入れてください。";
  const userPrompt = `以下の条件で日記を作ってください：
- 文字数は約${length}文字
- トピック: ${topic || "自由"}
- 出勤時間: 12:00〜20:00
- 横浜の天気: 曇り
- 店舗キャンペーン: 新規様1000円引き、常連様も対象
- ネットミーム: 1つ入れてOK
- 全体のトーン: ギャル寄り・親しみやすい・読んでて楽しい`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 1
    })
  });

  const data = await response.json();
  const diary = data.choices?.[0]?.message?.content;
  res.status(200).json({ diary });
}
