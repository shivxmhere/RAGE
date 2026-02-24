import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Plus } from 'lucide-react';

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.getDate(),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });

  const blocks = [
    { time: '06:00 - 08:00', title: 'Deep Study', desc: 'Cyber Security Basics', type: 'study', color: 'bg-cyan/20 border-cyan text-cyan' },
    { time: '08:00 - 09:00', title: 'Exercise', desc: 'HIIT Workout', type: 'health', color: 'bg-green/20 border-green text-green' },
    { time: '10:00 - 12:00', title: 'Deep Study', desc: 'Python Scripting', type: 'study', color: 'bg-cyan/20 border-cyan text-cyan' },
    { time: '18:00 - 20:00', title: 'Social', desc: 'Gaming Night', type: 'social', color: 'bg-purple/20 border-purple text-purple' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-white/5 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-cyan" />
          <h1 className="text-xl font-bold tracking-tight uppercase text-text">THE GRID</h1>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scrollbar bg-bg border-b border-white/5 shrink-0">
        {days.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDay(d.date)}
            className={`flex flex-col items-center justify-center min-w-[3.5rem] h-14 rounded-xl border transition-all ${
              selectedDay === d.date
                ? 'bg-cyan/10 border-cyan text-cyan shadow-[0_0_10px_rgba(0,245,255,0.3)]'
                : 'bg-card border-white/10 text-muted hover:border-white/30'
            }`}
          >
            <span className="text-xs font-medium uppercase">{d.day}</span>
            <span className="text-lg font-bold font-mono">{d.date}</span>
          </button>
        ))}
      </div>

      {/* AI Button */}
      <div className="px-4 py-3 bg-bg shrink-0">
        <button className="relative w-full h-12 rounded-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple to-cyan opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-white font-bold tracking-wider uppercase text-sm">AI Build My Day</span>
          </div>
        </button>
      </div>

      {/* Time Grid */}
      <div className="flex-1 overflow-y-auto relative bg-bg">
        <div className="absolute left-[3.5rem] top-[240px] w-[calc(100%-3.5rem)] h-[2px] bg-orange z-20 flex items-center">
          <div className="w-2 h-2 rounded-full bg-orange -ml-1 shadow-[0_0_8px_#FF6B35]" />
          <div className="text-[10px] text-orange font-bold ml-1 bg-bg px-1 uppercase tracking-widest">NOW</div>
        </div>

        <div className="grid grid-cols-[3.5rem_1fr] min-h-full pb-24">
          {/* Time Column */}
          <div className="flex flex-col border-r border-white/5 bg-card/30">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="h-20 border-b border-white/5 flex items-start justify-center pt-2 text-xs text-muted font-mono">
                {String(i + 6).padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {/* Events Column */}
          <div className="relative">
            <div className="absolute inset-0 flex flex-col pointer-events-none">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="h-20 border-b border-white/5 border-dashed" />
              ))}
            </div>

            {/* Render Blocks */}
            <div className="absolute top-0 left-1 right-1 h-40 mt-[2px] p-2">
              <div className={`h-full w-full bg-cyan/20 border-l-4 border-cyan rounded-r-lg p-3 flex flex-col justify-between hover:bg-cyan/30 transition-colors cursor-pointer group shadow-[0_0_10px_rgba(0,245,255,0.1)] backdrop-blur-sm`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-cyan font-bold text-sm uppercase tracking-wider">Deep Study</h3>
                    <p className="text-slate-300 text-xs font-mono mt-1">Cyber Security Basics</p>
                  </div>
                </div>
                <div className="text-cyan/70 text-[10px] font-mono">06:00 - 08:00</div>
              </div>
            </div>

            <div className="absolute top-40 left-1 right-1 h-[80px] mt-[2px] p-2">
              <div className={`h-full w-full bg-green/20 border-l-4 border-green rounded-r-lg p-3 flex flex-col justify-between hover:bg-green/30 transition-colors cursor-pointer group backdrop-blur-sm`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-green font-bold text-sm uppercase tracking-wider">Exercise</h3>
                    <p className="text-slate-300 text-xs font-mono mt-1">HIIT Workout</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-[320px] left-1 right-1 h-40 mt-[2px] p-2">
              <div className={`h-full w-full bg-cyan/20 border-l-4 border-cyan rounded-r-lg p-3 flex flex-col justify-between hover:bg-cyan/30 transition-colors cursor-pointer group shadow-[0_0_10px_rgba(0,245,255,0.1)] backdrop-blur-sm`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-cyan font-bold text-sm uppercase tracking-wider">Deep Study</h3>
                    <p className="text-slate-300 text-xs font-mono mt-1">Python Scripting</p>
                  </div>
                </div>
                <div className="text-cyan/70 text-[10px] font-mono">10:00 - 12:00</div>
              </div>
            </div>
            
            <div className="absolute top-[960px] left-1 right-1 h-40 mt-[2px] p-2">
              <div className={`h-full w-full bg-purple/20 border-l-4 border-purple rounded-r-lg p-3 flex flex-col justify-between hover:bg-purple/30 transition-colors cursor-pointer group shadow-[0_0_10px_rgba(124,58,237,0.1)] backdrop-blur-sm`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-purple font-bold text-sm uppercase tracking-wider">Social</h3>
                    <p className="text-slate-300 text-xs font-mono mt-1">Gaming Night</p>
                  </div>
                </div>
                <div className="text-purple/70 text-[10px] font-mono">18:00 - 20:00</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="absolute bottom-24 right-5 z-20">
        <button className="flex items-center justify-center w-14 h-14 rounded-full bg-cyan text-bg shadow-[0_0_15px_rgba(0,245,255,0.5)] hover:scale-105 transition-transform">
          <Plus className="w-8 h-8 font-bold" />
        </button>
      </div>
    </motion.div>
  );
}
