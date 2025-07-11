"use client";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./components/ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState("es");

  useEffect(() => {
    setLang(navigator.language.split("-")[0] || "es");
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    setError(null);
    const userMsg: Message = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          lang,
        }),
      });
      if (!res.ok) throw new Error("Error en la respuesta de BozoGPT");
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.reply }]);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Error desconocido";
      console.error("API catch error:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="flex flex-col items-center justify-between w-full max-w-2xl mx-auto bg-zinc-900 shadow-lg border border-zinc-800 overflow-hidden rounded-none sm:rounded-xl px-2 sm:px-0">
      <div
        ref={chatRef}
        className="w-full overflow-y-auto px-2 sm:px-4 py-3 sm:py-6 space-y-3 sm:space-y-4 min-h-[200px] max-h-[60vh]"
      >
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 mt-8 sm:mt-10 select-none px-4">
            <div className="text-sm sm:text-base">¡Hazle una pregunta absurda a BozoGPT!</div>
          </div>
        )}
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[80%] bg-zinc-800 text-bozo-accent border border-bozo/30 animate-pulse">
              <span className="block text-xs mb-1 opacity-70">BozoGPT</span>
              <span className="text-sm sm:text-base">Pensando en una tontería...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 mt-2 text-sm sm:text-base px-4">{error}</div>
        )}
      </div>
      <form
        className="w-full flex items-center gap-2 p-2 sm:p-4 border-t border-zinc-800 bg-zinc-950"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          className="flex-1 rounded-lg px-3 sm:px-4 py-2 bg-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-bozo placeholder-zinc-500 text-sm sm:text-base"
          placeholder="Escribe tu duda... aunque no sabré la respuesta 🤷‍♂️"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          autoFocus
        />
        <button
          type="submit"
          className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg transition-colors disabled:opacity-60 text-sm sm:text-base whitespace-nowrap"
          disabled={loading || !input.trim()}
        >
          {loading ? "🤡..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}
