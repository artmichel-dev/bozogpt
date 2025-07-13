import React from 'react';
import Image from 'next/image';
import { ChatInput } from './ChatInput';

interface WelcomeMessageProps {
  onSend: () => void;
  input: string;
  onChange: (value: string) => void;
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function WelcomeMessage({ onSend, input, onChange, loading, inputRef }: WelcomeMessageProps) {
  return (
    <div className="welcome-screen px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src="/bozogpt-icon.svg" 
              alt="BozoGPT" 
              width="48" 
              height="48" 
              className="text-zinc-100"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 select-none">
              Ignorancia Artificial™
            </h1>
          </div>
          <p className="text-zinc-400 text-base sm:text-lg max-w-md">
            La primera IA entrenada con educación pública y televisión mexicana
          </p>
        </div>
        
        <div className="w-full max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ChatInput
            ref={inputRef}
            value={input}
            onChange={onChange}
            onSend={onSend}
            loading={loading}
            className="w-full"
          />
        </div>
        
        <div className="mt-6 text-center text-zinc-500 text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p>La parodia de ChatGPT que responde todo mal, ignora todo los tema per te divertirá.</p>
        </div>
      </div>
    </div>
  );
} 