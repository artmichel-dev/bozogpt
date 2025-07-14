"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { LoadingMessage } from "./components/LoadingMessage";
import { ErrorMessage } from "./components/ErrorMessage";
import { WelcomeMessage } from "./components/WelcomeMessage";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [lang, setLang] = useState("es");

  useEffect(() => {
    setLang(navigator.language.split("-")[0] || "es");
  }, []);

  // Scroll siempre al fondo cuando hay mensajes nuevos
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
      const requestBody = {
        messages: [...messages, userMsg],
        lang,
      };
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Error ${res.status}: ${errorData}`);
      }
      
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.reply }]);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Error desconocido";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen min-h-0 w-full overflow-hidden">
      {/* Header (si lo tienes en layout, puedes quitarlo aquí) */}
      <main className="flex-1 flex flex-col min-h-0">
      {isEmpty ? (
          // Bienvenida: input centrado, footer clásico fijo abajo
          <>
            <div className="flex-1 flex flex-col items-center justify-center">
              <WelcomeMessage
                onSend={sendMessage}
                input={input}
                onChange={setInput}
                loading={loading}
                inputRef={inputRef}
              />
            </div>
            {/* Footer clásico, solo en bienvenida */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-zinc-900 border-t border-zinc-800 flex flex-row items-center justify-center gap-2 px-4 py-2 text-zinc-300 text-xs sm:text-sm">
              <div className="flex items-center gap-1 mr-1">
                <Image 
                  src="/bozogpt-icon.svg" 
                  alt="BozoGPT" 
                  width="16" 
                  height="16" 
                  className="text-zinc-100"
                />
                <span className="font-bold text-base sm:text-sm">BozoGPT™</span>
              </div>
              <span className="font-normal">Desarrollado por</span>
              <a href="https://www.artmichel.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-100 hover:text-bozo-accent transition-all -ml-1 mr-2 align-middle">Art Michel</a>
              <a href="https://github.com/artmichel-dev" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-zinc-100 transition-all" aria-label="GitHub @artmichel-dev">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 align-middle" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
              </a>
              <a href="https://x.com/artmichel_eth" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-zinc-100 transition-all ml-1" aria-label="X @artmichel_eth">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor" className="h-4 w-4 align-middle" ><path d="M1199.76 0H944.13L599.88 494.13 255.87 0H.24l438.6 637.5L0 1227.01h255.87l344.01-494.13 343.89 494.13h255.87L761.16 637.5z"/></svg>
              </a>
              <a href="https://instagram.com/artmichel" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-zinc-100 transition-all ml-1" aria-label="Instagram @artmichel">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4 align-middle"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1S388.6 1.7 353.3.1C317.7-1.6 130.3-1.6 94.7.1 59.4 1.7 28 9.9 2.6 36.2S1.7 59.4.1 94.7C-1.6 130.3-1.6 317.7.1 353.3c1.7 35.3 9.9 66.7 36.2 92.1s56.8 34.5 92.1 36.2c35.6 1.7 223 1.7 258.6 0 35.3-1.7 66.7-9.9 92.1-36.2s34.5-56.8 36.2-92.1c1.7-35.6 1.7-223 0-258.6zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7-22.9 42.5-42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"/></svg>
              </a>
            </div>
          </>
        ) : (
          <>
            {/* Fade/sombra arriba, siempre visible cuando hay conversación */}
            <div className="pointer-events-none w-full z-20" style={{position: 'relative'}}>
              <div className="absolute top-0 left-0 w-full h-10" style={{background: 'linear-gradient(to bottom, rgba(24,24,27,1) 70%, rgba(24,24,27,0))'}} />
            </div>
            {/* Área de mensajes: crecen hacia arriba, scrollable */}
                        <div
              className="flex-1 flex flex-col justify-end overflow-y-auto min-h-0 relative"
              aria-label="Historial del chat"
            ref={chatRef}
          >
              {/* Fade/sombra arriba, ahora sí como gradiente real */}
              <div className="pointer-events-none absolute top-0 left-0 w-full z-10"
                   style={{background: 'linear-gradient(to bottom, rgb(24,24,27) 10%, rgba(24,24,27,0))'}} />
              <div className="w-full px-4 sm:px-6 py-4 space-y-4 min-h-[120px] max-w-2xl mx-auto flex flex-col">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
                {loading && <LoadingMessage />}
                {error && <ErrorMessage message={error} />}
              </div>
            </div>
            {/* Input y footer juntos, siempre al fondo, sin sticky ni absolute */}
            <div className="shrink-0 flex flex-col w-full max-w-2xl mx-auto">
              <div className="w-full flex justify-center items-center gap-0 p-4 bg-transparent">
                <ChatInput
                  ref={inputRef}
                  value={input}
                  onChange={setInput}
                  onSend={sendMessage}
                  loading={loading}
                  className="max-w-2xl"
                />
              </div>
              {/* Footer aquí, solo en modo conversación */}
              <div className="w-full flex flex-row items-center justify-center gap-2 my-2 text-zinc-300 text-xs sm:text-sm">
                <div className="flex items-center gap-1 mr-1">
                  <Image 
                    src="/bozogpt-icon.svg" 
                    alt="BozoGPT" 
                    width="16" 
                    height="16" 
                    className="text-zinc-100"
                  />
                  <span className="font-bold text-base sm:text-sm">BozoGPT™</span>
                </div>
                <span className="font-normal">Desarrollado por</span>
                <a href="https://www.artmichel.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-100 hover:text-bozo-accent transition-all -ml-1 mr-2 align-middle">Art Michel</a>
                <a href="https://github.com/artmichel-dev" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-zinc-100 transition-all" aria-label="GitHub @artmichel-dev">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 align-middle" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                </a>
                <a href="https://x.com/artmichel_eth" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-zinc-100 transition-all ml-1" aria-label="X @artmichel_eth">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor" className="h-4 w-4 align-middle" ><path d="M1199.76 0H944.13L599.88 494.13 255.87 0H.24l438.6 637.5L0 1227.01h255.87l344.01-494.13 343.89 494.13h255.87L761.16 637.5z"/></svg>
                </a>
                <a href="https://instagram.com/artmichel" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-zinc-100 transition-all ml-1" aria-label="Instagram @artmichel">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4 align-middle"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1S388.6 1.7 353.3.1C317.7-1.6 130.3-1.6 94.7.1 59.4 1.7 28 9.9 2.6 36.2S1.7 59.4.1 94.7C-1.6 130.3-1.6 317.7.1 353.3c1.7 35.3 9.9 66.7 36.2 92.1s56.8 34.5 92.1 36.2c35.6 1.7 223 1.7 258.6 0 35.3-1.7 66.7-9.9 92.1-36.2s34.5-56.8 36.2-92.1c1.7-35.6 1.7-223 0-258.6zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7-22.9 42.5-42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"/></svg>
                </a>
              </div>
            </div>
          </>
        )}
        </main>
    </div>
  );
}
