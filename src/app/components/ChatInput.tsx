import React, { forwardRef } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ value, onChange, onSend, loading, placeholder = "Escribe tu duda... aunque no sabré la respuesta 🤷‍♂️", disabled = false, className = "" }, ref) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSend();
    };

    return (
      <form onSubmit={handleSubmit} className={`w-full ${className}`}>
        <div className="flex w-full items-center bg-zinc-800 rounded-3xl shadow-lg border border-zinc-700/50 transition-all duration-200 hover:border-zinc-600/50 focus-within:border-zinc-500/50 focus-within:shadow-xl">
          <input
            ref={ref}
            type="text"
            className="flex-1 rounded-3xl px-5 py-4 bg-transparent text-zinc-100 focus:outline-none placeholder-zinc-400 text-base sm:text-lg border-none shadow-none focus-visible-outline transition-all duration-200"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || loading}
            autoFocus
          />
          <button
            type="submit"
            className={`flex items-center justify-center bg-transparent text-zinc-400 hover:text-zinc-100 font-bold py-0 px-4 rounded-3xl transition-all duration-200 disabled:opacity-60 text-base sm:text-lg border-none shadow-none touch-h-10 touch-w-10 ${
              value.trim() && !loading ? 'text-zinc-300 hover:text-zinc-100' : 'text-zinc-500'
            }`}
            disabled={disabled || loading || !value.trim()}
            aria-label="Enviar mensaje"
          >
            {loading ? (
              <div className="flex items-center gap-1">
                <span className="text-sm">🤡</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-6 h-6 transition-transform duration-200 hover:scale-110"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.12 1.152.488V8.25c4.5 0 8.25 1.5 10.5 4.5-2.25 3-6 4.5-10.5 4.5v4.217c0 .609-.713.928-1.152.489L2.25 12z" />
              </svg>
            )}
          </button>
        </div>
      </form>
    );
  }
);

ChatInput.displayName = 'ChatInput'; 