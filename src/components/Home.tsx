import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Clock, Flame, Brain, Target, RefreshCw, Calendar, FolderOpen, User } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export default function Home() {
  const { state, toggleTask, logMood } = useStore();
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState("Pain is temporary. GPA is forever. Focus metrics up 12%. Maintain aggressive posture.");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const hour = time.getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    return () => clearInterval(timer);
  }, [time]);

  const dayProgress = ((time.getHours() * 60 + time.getMinutes()) / (24 * 60)) * 100;

  const moods = [
    { emoji: '😴', label: 'Low energy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😊', label: 'Good' },
    { emoji: '🔥', label: 'On fire' },
    { emoji: '⚡', label: 'Beast mode' },
  ];

  const refreshQuote = () => {
    const quotes = [
      "Pain is temporary. GPA is forever. Focus metrics up 12%. Maintain aggressive posture.",
      "You said you wanted to be great. Prove it today.",
      "Discipline equals freedom. Do the work.",
      "Stop negotiating with yourself. Execute the plan.",
      "Average effort gets average results. What are you choosing today?"
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 pb-24 px-4 pt-6"
    >
      {/* Header & Clock */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-sm font-bold text-cyan tracking-widest uppercase mb-1">
            {greeting}
          </h2>
          <h1 className="text-3xl font-bold text-text tracking-wide">SHIVAM.</h1>
        </div>
        <div className="text-right">
          <div className="font-orbitron text-2xl font-bold text-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.6)]">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <div className="text-xs text-muted font-mono mt-1">
            {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Day Progress */}
      <div className="bg-card rounded-xl p-4 border border-cyan/20 shadow-[0_0_15px_rgba(0,245,255,0.05)]">
        <div className="flex justify-between text-xs font-mono text-muted mb-2 uppercase">
          <span>Day Progress</span>
          <span className="text-cyan">{dayProgress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-bg rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan/50 to-cyan shadow-[0_0_10px_#00F5FF]"
            style={{ width: `${dayProgress}%` }}
          />
        </div>
      </div>

      {/* Energy Check-in */}
      <div className="bg-card rounded-xl p-4 border border-white/5">
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Energy Check-in</h3>
        <div className="flex justify-between">
          {moods.map((m) => (
            <button
              key={m.emoji}
              onClick={() => logMood(m.emoji, m.label)}
              className="w-12 h-12 rounded-full bg-bg border border-white/10 flex items-center justify-center text-2xl hover:border-cyan hover:bg-cyan/10 transition-all hover:scale-110 active:scale-95"
              title={m.label}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Mission */}
      <div className="bg-card rounded-xl p-4 border border-orange/30 shadow-[0_0_15px_rgba(255,107,53,0.1)]">
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <Target className="w-5 h-5 text-orange animate-pulse" />
          <h3 className="text-sm font-bold text-orange uppercase tracking-widest">Today's Mission</h3>
        </div>
        <div className="flex flex-col gap-3">
          {state.tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                task.completed
                  ? 'bg-bg/50 border-white/5 opacity-50'
                  : 'bg-bg border-white/10 hover:border-cyan/50'
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <button className="mt-0.5 text-cyan shrink-0">
                {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </button>
              <div className="flex-1">
                <p className={`text-sm font-bold ${task.completed ? 'line-through text-muted' : 'text-text'}`}>
                  {task.title}
                </p>
                <div className="flex gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                    task.tag === 'URGENT' ? 'bg-orange/20 text-orange' :
                    task.tag === 'STUDY' ? 'bg-cyan/20 text-cyan' :
                    task.tag === 'HEALTH' ? 'bg-green/20 text-green' : 'bg-purple/20 text-purple'
                  }`}>
                    {task.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Rings */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Study', value: state.studyHours, max: 8, unit: 'h', color: 'text-cyan', stroke: '#00F5FF' },
          { label: 'Focus', value: 85, max: 100, unit: '%', color: 'text-orange', stroke: '#FF6B35' },
          { label: 'Streak', value: state.streak, max: 30, unit: 'd', color: 'text-green', stroke: '#39FF14' },
        ].map((stat, i) => {
          const percentage = (stat.value / stat.max) * 100;
          const strokeDasharray = `${percentage}, 100`;
          return (
            <div key={i} className="bg-card rounded-xl p-4 flex flex-col items-center gap-2 border border-white/5 hover:border-cyan/30 transition-colors">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={stat.stroke}
                    strokeWidth="2.5"
                    strokeDasharray={strokeDasharray}
                    className="drop-shadow-[0_0_5px_currentColor]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-sm font-bold font-mono">
                    {stat.value}{stat.unit}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${stat.color}`}>
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: Calendar, label: 'Schedule', id: 'timetable' },
          { icon: FolderOpen, label: 'Vault', id: 'vault' },
          { icon: Target, label: 'Goals', id: 'goals' },
          { icon: User, label: 'Profile', id: 'profile' },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => {
              // We need a way to change screen from Home. We can pass a prop or use a global state.
              // For now, let's just trigger a custom event or we can pass a prop.
              window.dispatchEvent(new CustomEvent('navigate', { detail: item.id }));
            }}
            className="bg-card rounded-xl p-3 flex flex-col items-center gap-2 border border-white/5 hover:border-cyan/30 transition-colors"
          >
            <item.icon className="w-6 h-6 text-cyan" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{item.label}</span>
          </button>
        ))}
      </div>

      {/* RAGE Says */}
      <div className="bg-gradient-to-r from-orange/20 to-transparent p-[1px] rounded-xl">
        <div className="bg-card rounded-xl p-5 h-full">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-orange" />
              <h3 className="text-xs font-bold text-orange uppercase tracking-widest">RAGE Says</h3>
            </div>
            <button onClick={refreshQuote} className="text-muted hover:text-cyan transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm font-mono text-text/90 leading-relaxed italic">
            "{quote}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
