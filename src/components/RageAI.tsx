import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Mic, BrainCircuit } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { GoogleGenAI } from '@google/genai';

export default function RageAI() {
  const { state, addChat } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    addChat({ role: 'user', text: userMsg });
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const systemPrompt = `You are RAGE — Shivam's personal AI life coach and best friend. 
You know his habits, goals, schedule, mood, and patterns. You are direct, motivating, honest, and speak like a brilliant older brother who genuinely wants Shivam to succeed. Never be generic. Always be specific to Shivam's life.
Current State:
- Tasks: ${state.tasks.filter(t => !t.completed).map(t => t.title).join(', ')}
- Study Hours: ${state.studyHours}
- Streak: ${state.streak}
- Level: ${state.level}
- XP: ${state.xp}
- Goals: ${state.goals.map(g => g.title).join(', ')}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: systemPrompt + "\nUser: " + userMsg,
      });

      addChat({ role: 'model', text: response.text || 'Error processing response.' });
    } catch (error) {
      console.error('Error calling Gemini:', error);
      addChat({ role: 'model', text: 'Connection to RAGE core failed. Check network.' });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full bg-bg pb-24"
    >
      {/* Header & Orb */}
      <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-card to-transparent shrink-0">
        <div className="relative w-24 h-24 rounded-full shadow-[0_0_40px_rgba(0,245,255,0.3),inset_0_0_20px_rgba(124,58,237,0.4)] animate-pulse bg-gradient-to-br from-cyan via-purple to-orange opacity-90 backdrop-blur-3xl flex items-center justify-center mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
          <div className="w-16 h-16 rounded-full bg-bg/30 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <BrainCircuit className="w-8 h-8 text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
        <h2 className="text-cyan font-bold text-lg tracking-widest uppercase">RAGE CORE</h2>
        <p className="text-muted text-[10px] uppercase tracking-[0.2em] font-mono">System Optimal • Level {state.level} Clearance</p>
      </div>

      {/* Insight Pills */}
      <div className="w-full overflow-x-auto hide-scrollbar px-4 py-2 shrink-0">
        <div className="flex gap-3 min-w-max">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-cyan/20 backdrop-blur-md">
            <span className="text-[10px] font-mono text-cyan">Avg sleep: 6.5h</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-purple/20 backdrop-blur-md">
            <span className="text-[10px] font-mono text-purple">Focus Score: 85</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-orange/20 backdrop-blur-md">
            <span className="text-[10px] font-mono text-orange">Tasks: {state.tasks.filter(t => !t.completed).length} left</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {state.chatHistory.length === 0 && (
          <div className="text-center text-muted text-sm font-mono mt-10">
            <p>RAGE is online.</p>
            <p className="mt-2 text-cyan">"Morning Shivam. Ready to make today count or are we doing yesterday again?"</p>
          </div>
        )}

        {state.chatHistory.map((msg, i) => (
          <div key={i} className={`flex gap-3 items-end max-w-[85%] ${msg.role === 'user' ? 'ml-auto justify-end' : ''}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,245,255,0.5)]">
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`p-3 rounded-2xl text-sm shadow-lg font-mono ${
              msg.role === 'user'
                ? 'rounded-br-none bg-cyan/20 border border-cyan/30 text-cyan shadow-[0_0_15px_rgba(0,245,255,0.1)]'
                : 'rounded-bl-none bg-card border border-purple/30 text-text border-l-4'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-end max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,245,255,0.5)]">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <div className="p-3 rounded-2xl rounded-bl-none bg-card border border-purple/30 border-l-4 flex gap-1 items-center">
              <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="px-4 pb-4 pt-2 bg-bg/80 backdrop-blur-xl border-t border-white/5 shrink-0">
        <div className="flex items-center gap-2 bg-card rounded-xl px-2 py-2 border border-white/10 focus-within:border-cyan/50 transition-colors">
          <input
            className="flex-1 bg-transparent border-none text-white placeholder-muted focus:ring-0 text-sm font-mono px-2 outline-none"
            placeholder="Talk to RAGE..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="p-2 text-cyan/70 hover:text-cyan transition-colors rounded-lg hover:bg-white/5">
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 bg-cyan/20 text-cyan rounded-lg hover:bg-cyan hover:text-bg transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
