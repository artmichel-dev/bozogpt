import React from "react";

export function ChatMessage({ role, content }: { role: "user" | "assistant"; content: string }) {
  return (
    <div className={`flex w-full ${role === "user" ? "justify-end" : "justify-start"} py-1 sm:py-2 animate-fade-in`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[90%] sm:max-w-[75%] lg:max-w-[70%] whitespace-pre-line text-base sm:text-lg transition-all duration-200 shadow-lg border
          ${role === "user"
            ? "bg-zinc-700 text-zinc-100 font-medium border-zinc-600/50 shadow-zinc-900/20"
            : "bg-zinc-800 text-zinc-100 border-zinc-700/50 shadow-zinc-900/20"
          }
        `}
        role="article"
        aria-label={`Mensaje de ${role === "user" ? "usuario" : "BozoGPT"}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            role === "user" 
              ? "bg-zinc-600 text-zinc-300" 
              : "bg-bozo-accent/20 text-bozo-accent"
          }`}>
            {role === "user" ? "Tú" : "BozoGPT"}
          </span>
          <span className="text-xs text-zinc-500">
            {new Date().toLocaleTimeString('es-MX', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div className="break-words leading-relaxed">{content}</div>
      </div>
    </div>
  );
} 