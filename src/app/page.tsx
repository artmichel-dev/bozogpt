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
      setTimeout(() => {
        chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
      }, 50);
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

  // Scroll to bottom when keyboard appears on mobile
  useEffect(() => {
    const handleResize = () => {
      if (chatRef.current) {
        setTimeout(() => {
          chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Centrar input al enfocarse en móvil
  useEffect(() => {
    const input = document.querySelector('input[type="text"]');
    if (!input) return;
    const handler = () => {
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    };
    input.addEventListener('focus', handler);
    return () => input.removeEventListener('focus', handler);
  }, []);

  const isEmpty = messages.length === 0;
  return (
    <div className="flex flex-col items-center flex-1 w-full min-h-0 h-full">
      {isEmpty ? (
        <form
          className="flex flex-col items-center justify-center w-full max-w-xl mx-auto flex-1 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-zinc-100 select-none">¿En qué piensas hoy?</h2>
          <div className="flex w-full items-center bg-zinc-700 rounded-3xl">
            <input
              type="text"
              className="flex-1 rounded-3xl px-5 py-3 bg-transparent text-zinc-100 focus:outline-none placeholder-zinc-300 text-base sm:text-lg border-none shadow-none"
              placeholder="Escribe tu duda... aunque no sabré la respuesta 🤷‍♂️"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              autoFocus
              aria-label="Escribe tu pregunta para BozoGPT"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-transparent text-zinc-300 hover:text-zinc-100 font-bold py-0 px-4 rounded-3xl transition-colors disabled:opacity-60 text-base sm:text-lg border-none shadow-none"
              disabled={loading || !input.trim()}
              aria-label={loading ? "Enviando mensaje..." : "Enviar mensaje"}
            >
              {loading ? (
                <span role="img" aria-label="Pensando">🤡...</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.12 1.152.488V8.25c4.5 0 8.25 1.5 10.5 4.5-2.25 3-6 4.5-10.5 4.5v4.217c0 .609-.713.928-1.152.489L2.25 12z" /></svg>
              )}
            </button>
          </div>
        </form>
      ) : (
        <main className="flex flex-col items-center w-full max-w-2xl mx-auto bg-transparent px-0 py-0 flex-1 min-h-0 h-full">
          <div
            ref={chatRef}
            className="w-full flex-1 min-h-0 overflow-y-auto px-2 sm:px-6 py-4 space-y-4 flex flex-col justify-end"
          >
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 max-w-[85%] sm:max-w-[80%] bg-zinc-700 text-bozo-accent animate-pulse" role="status" aria-live="polite">
                  <span className="block text-xs mb-1 opacity-70">BozoGPT</span>
                  <span className="text-base sm:text-lg">Pensando en una tontería...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="text-center text-red-400 mt-2 text-base sm:text-lg px-4">{error}</div>
            )}
          </div>
          <form
            className="w-full flex justify-center items-center gap-0 p-4 bg-transparent flex-shrink-0"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <div className="flex flex-1 max-w-2xl items-center bg-zinc-700 rounded-3xl">
              <input
                type="text"
                className="flex-1 rounded-3xl px-5 py-3 bg-transparent text-zinc-100 focus:outline-none placeholder-zinc-300 text-base sm:text-lg border-none shadow-none"
                placeholder="Escribe tu duda... aunque no sabré la respuesta 🤷‍♂️"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus
                aria-label="Escribe tu pregunta para BozoGPT"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-transparent text-zinc-300 hover:text-zinc-100 font-bold py-0 px-4 rounded-3xl transition-colors disabled:opacity-60 text-base sm:text-lg border-none shadow-none"
                disabled={loading || !input.trim()}
                aria-label={loading ? "Enviando mensaje..." : "Enviar mensaje"}
              >
                {loading ? (
                  <span role="img" aria-label="Pensando">🤡...</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.12 1.152.488V8.25c4.5 0 8.25 1.5 10.5 4.5-2.25 3-6 4.5-10.5 4.5v4.217c0 .609-.713.928-1.152.489L2.25 12z" /></svg>
                )}
              </button>
            </div>
          </form>
        </main>
      )}
    </div>
  );
}
