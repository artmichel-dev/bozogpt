import React from "react";

export function ChatMessage({ role, content }: { role: "user" | "assistant"; content: string }) {
  return (
    <div className={`flex w-full ${role === "user" ? "justify-end" : "justify-start"} py-1 sm:py-2`}>
      <div
        className={`rounded-3xl px-5 py-4 max-w-[90%] sm:max-w-[75%] whitespace-pre-line text-base sm:text-lg transition-all duration-200
          ${role === "user"
            ? "bg-zinc-700 text-zinc-100 font-semibold"
            : "bg-zinc-800 text-zinc-200"}
        `}
      >
        <span className="block text-xs mb-1 opacity-70">
          {role === "user" ? "Tú" : "BozoGPT"}
        </span>
        <div className="break-words">{content}</div>
      </div>
    </div>
  );
} 