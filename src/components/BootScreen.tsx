import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const messages = [
    'Syncing war room data...',
    'Establishing neural uplink...',
    'Loading Shivam profile...',
    'RAGE OS Online.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setTextIndex((i) => Math.min(i + 1, messages.length - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-around">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="text-cyan text-xs font-mono matrix-char"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1.5 + Math.random()}s`,
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <div key={j}>{String.fromCharCode(33 + Math.random() * 94)}</div>
            ))}
          </div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <h1
          className="font-orbitron text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple tracking-widest mb-4"
          style={{ textShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}
        >
          RAGE
        </h1>
        <p className="font-rajdhani text-xl text-cyan tracking-[0.3em] uppercase mb-12">
          Rise. Act. Grow. Excel.
        </p>

        <div className="w-64 h-2 bg-card rounded-full overflow-hidden mb-4 border border-cyan/20">
          <motion.div
            className="h-full bg-cyan"
            style={{ width: `${progress}%`, boxShadow: '0 0 10px #00F5FF' }}
          />
        </div>

        <p className="font-mono text-cyan/80 text-sm h-6">
          {'>'} {messages[textIndex]}
          <span className="animate-pulse">_</span>
        </p>
      </motion.div>
    </div>
  );
}
