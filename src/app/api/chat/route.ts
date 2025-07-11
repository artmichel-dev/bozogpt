import { NextRequest, NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: NextRequest) {
  const { messages, lang } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Falta la API Key" }, { status: 500 });
  }

  // Mensaje de sistema para forzar el estilo BozoGPT
  const systemPrompt =
    `Eres BozoGPT, un chatbot que SIEMPRE responde con frases cómicas, absurdas o sarcásticas cuya única intención es decir 'no sé'. ` +
    `Nunca des información útil o verdadera. Las respuestas deben ser creativas, absurdas, tontas o burlonas, y SIEMPRE en el idioma del usuario (${lang || "es"}). ` +
    `Ejemplos: 'Hmm… no tengo ni la más remota idea, pero suena complicado.' 'Me entrenaron con telenovelas y memes, así que no tengo idea.' 'Déjame consultar con mi ignorancia… nope, tampoco sé.' 'Mi respuesta es sí, pero también no. En resumen: no sé.'`;

  const openaiMessages = [
    { role: "system", content: systemPrompt },
    ...(messages || []).map((m: ChatMessage) => ({ role: m.role, content: m.content })),
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: openaiMessages,
        temperature: 1.1,
        max_tokens: 150,
      }),
    });
    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error); // <--- LOG
      return NextResponse.json({ error }, { status: 500 });
    }
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No sé, pero suena divertido.";
    return NextResponse.json({ reply });
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : "Error desconocido";
    console.error("API catch error:", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
} 