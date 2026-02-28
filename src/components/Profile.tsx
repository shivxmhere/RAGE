import { motion } from 'motion/react';
import { Settings, Timer, Flame, CheckCircle2, Brain, Award, Zap, BookOpen, Lock, User, Bell, Shield, ChevronRight } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export default function Profile() {
  const { state } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6 pb-24 px-4 pt-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 bg-bg z-10 sticky top-0">
        <h2 className="text-white text-2xl font-bold tracking-wider uppercase flex-1 text-center">THE COMMANDER</h2>
        <button className="flex items-center justify-center w-10 h-10 rounded-full text-cyan hover:bg-cyan/10 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center gap-4 py-4">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan to-blue-600 opacity-75 blur transition duration-500 group-hover:opacity-100" />
          <div className="relative h-32 w-32 rounded-full border-4 border-bg bg-card overflow-hidden flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-8 w-8 bg-cyan rounded-full flex items-center justify-center text-bg font-bold shadow-lg border-2 border-bg">
            {state.level}
          </div>
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight">Shivam</h2>
          <p className="text-cyan font-medium uppercase tracking-widest text-sm">Level {state.level} Commander</p>
        </div>

        {/* XP Progress */}
        <div className="w-full max-w-sm space-y-2 mt-4">
          <div className="flex justify-between text-xs font-medium text-muted uppercase tracking-wider">
            <span>XP Progress</span>
            <span className="text-cyan">{state.xp} / {(state.level + 1) * 1000}</span>
          </div>
          <div className="h-3 w-full bg-card rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-cyan/60 via-cyan to-blue-500 shadow-[0_0_10px_rgba(0,245,255,0.5)]" style={{ width: `${(state.xp / ((state.level + 1) * 1000)) * 100}%` }} />
          </div>
          <p className="text-center text-xs text-muted">{(state.level + 1) * 1000 - state.xp} XP to Level {state.level + 1}</p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 gap-3">
        <div className="relative overflow-hidden rounded-xl bg-card border border-white/5 p-4 group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Timer className="w-10 h-10" />
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Study Hours</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">{state.studyHours}</span>
            <span className="text-xs font-medium text-green mb-1">+12%</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-card border border-white/5 p-4 group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Flame className="w-10 h-10" />
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Day Streak</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">{state.streak}</span>
            <span className="text-xs font-medium text-green mb-1">+1</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-card border border-white/5 p-4 group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Tasks Crushed</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">{state.tasks.filter(t => t.completed).length}</span>
            <span className="text-xs font-medium text-green mb-1">+5%</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-card border border-white/5 p-4 group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Brain className="w-10 h-10" />
          </div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">Focus Score</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">92%</span>
            <span className="text-xs font-medium text-green mb-1">+3%</span>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Achievements</h3>
          <button className="text-xs text-cyan font-medium hover:text-cyan/80">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="aspect-square rounded-lg bg-card border border-cyan/30 flex flex-col items-center justify-center p-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan/5 group-hover:bg-cyan/10 transition-colors" />
            <Award className="w-8 h-8 text-cyan mb-1" />
            <span className="text-[10px] text-center leading-none text-slate-300">Scholar</span>
          </div>
          <div className="aspect-square rounded-lg bg-card border border-cyan/30 flex flex-col items-center justify-center p-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan/5 group-hover:bg-cyan/10 transition-colors" />
            <Zap className="w-8 h-8 text-cyan mb-1" />
            <span className="text-[10px] text-center leading-none text-slate-300">Speed</span>
          </div>
          <div className="aspect-square rounded-lg bg-card border border-cyan/30 flex flex-col items-center justify-center p-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan/5 group-hover:bg-cyan/10 transition-colors" />
            <BookOpen className="w-8 h-8 text-cyan mb-1" />
            <span className="text-[10px] text-center leading-none text-slate-300">Reader</span>
          </div>
          <div className="aspect-square rounded-lg bg-card/50 border border-white/5 flex flex-col items-center justify-center p-1 relative">
            <Lock className="w-8 h-8 text-muted mb-1" />
            <span className="text-[10px] text-center leading-none text-muted">Locked</span>
          </div>
        </div>
      </section>

      {/* NEXUS Personality Report */}
      <section className="rounded-xl bg-gradient-to-br from-card to-bg border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-cyan/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-cyan" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">RAGE Personality Report</h3>
            <p className="text-xs text-muted">Analysis complete. Updating weekly.</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-slate-300 font-medium">Archetype:</span>
            <span className="text-sm text-cyan font-bold uppercase tracking-wide">The Focused Builder</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Subject demonstrates exceptional consistency in module completion. High affinity for structured learning environments. Recommended strategy: Continue high-intensity sprint sessions.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="px-2 py-1 rounded bg-bg border border-white/5 text-[10px] text-slate-300">Analytical</span>
            <span className="px-2 py-1 rounded bg-bg border border-white/5 text-[10px] text-slate-300">Disciplined</span>
            <span className="px-2 py-1 rounded bg-bg border border-white/5 text-[10px] text-slate-300">Strategist</span>
          </div>
        </div>
      </section>

      {/* Settings List */}
      <section className="rounded-xl bg-card border border-white/5 overflow-hidden divide-y divide-white/5">
        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-muted" />
            <span className="text-sm font-medium text-slate-200">Account Details</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted" />
        </button>
        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted" />
            <span className="text-sm font-medium text-slate-200">Notifications</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted" />
        </button>
        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-muted" />
            <span className="text-sm font-medium text-slate-200">Privacy & Security</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted" />
        </button>
      </section>
    </motion.div>
  );
}
