import React from 'react';

export function LoadingMessage() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="rounded-2xl px-4 py-3 max-w-[85%] sm:max-w-[80%] bg-zinc-800 text-bozo-accent border border-zinc-700/50 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-bozo-accent/20 text-bozo-accent">
            BozoGPT
          </span>
          <span className="text-xs text-zinc-500">
            {new Date().toLocaleTimeString('es-MX', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg">Pensando en una tontería</span>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 