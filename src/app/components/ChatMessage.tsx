import React from "react";

export function ChatMessage({ role, content }: { role: "user" | "assistant"; content: string }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[80%] whitespace-pre-line text-sm sm:text-base shadow-md ${
          role === "user"
            ? "bg-zinc-700 text-zinc-100 font-semibold"
            : "bg-zinc-800 text-zinc-200 border border-zinc-700"
        }`}
      >
        <span className="block text-xs mb-1 opacity-70">
          {role === "user" ? "Tú" : "BozoGPT"}
        </span>
        <div className="break-words">{content}</div>
      </div>
    </div>
  );
} 