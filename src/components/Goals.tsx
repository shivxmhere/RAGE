import { motion } from 'motion/react';
import { Target, Zap, ChevronRight, AlertTriangle, Play } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export default function Goals() {
  const { state } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6 pb-24 px-4 pt-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 bg-bg z-10 sticky top-0">
        <h2 className="text-white text-2xl font-bold tracking-wider uppercase flex-1 text-center">THE NORTH STAR</h2>
      </div>

      {/* Status Summary */}
      <section className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card border border-white/5 rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan/10 rounded-full blur-xl group-hover:bg-cyan/20 transition-all" />
          <span className="text-muted text-xs font-medium tracking-wider uppercase">Active Directives</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white leading-none">04</span>
            <span className="text-xs text-cyan mb-1">ON TRACK</span>
          </div>
        </div>
        <div className="bg-card border border-white/5 rounded-xl p-4 flex flex-col gap-1 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange/10 rounded-full blur-xl group-hover:bg-orange/20 transition-all" />
          <span className="text-muted text-xs font-medium tracking-wider uppercase">Critical Alerts</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white leading-none">01</span>
            <span className="text-xs text-orange mb-1">ACTION REQ</span>
          </div>
        </div>
      </section>

      {/* Goal Card 1: Critical */}
      <article className="bg-card border border-cyan/30 shadow-[0_0_15px_rgba(0,245,255,0.1)] rounded-xl overflow-hidden relative">
        <div className="h-32 w-full relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
          <div className="w-full h-full bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }} />
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2 py-1 bg-orange/20 border border-orange/50 text-orange text-[10px] font-bold tracking-widest uppercase rounded">Critical Mission</span>
          </div>
          <div className="absolute top-3 right-3 z-20">
            <Zap className="w-5 h-5 text-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
          </div>
        </div>
        <div className="p-5 pt-2 relative z-20">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Cyber-Security Cert</h2>
              <p className="text-muted text-xs">Target Acquisition: Dec 2024</p>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-bold text-cyan">65%</span>
              <span className="text-[10px] text-cyan/70 uppercase tracking-wider">Complete</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-[10px] text-muted mb-1 font-mono uppercase">
              <span>Initiated</span>
              <span>Orbit</span>
            </div>
            <div className="h-2 bg-bg rounded-full overflow-hidden border border-white/5 relative">
              <div className="h-full bg-gradient-to-r from-cyan/40 via-cyan to-green w-[65%] shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
            </div>
          </div>
          <div className="bg-orange/10 border-l-2 border-orange p-3 rounded-r-lg mb-4 flex gap-3 items-start">
            <AlertTriangle className="w-4 h-4 text-orange mt-0.5" />
            <div>
              <p className="text-orange text-xs font-bold uppercase mb-0.5">NEXUS ALERT</p>
              <p className="text-slate-300 text-xs leading-relaxed">Velocity drop detected. You are 3 days behind the optimal trajectory. Engage study block immediately.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-cyan text-bg py-2 rounded font-bold text-sm uppercase tracking-wide hover:bg-white transition-colors flex items-center justify-center gap-2">
              <span>Resume Protocol</span>
              <Play className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      {/* Goal Card 2: On Track */}
      <article className="bg-card border border-white/5 rounded-xl overflow-hidden relative group hover:border-cyan/30 transition-colors">
        <div className="h-24 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
          <div className="w-full h-full bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }} />
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2 py-1 bg-cyan/10 border border-cyan/30 text-cyan text-[10px] font-bold tracking-widest uppercase rounded">Active Directive</span>
          </div>
        </div>
        <div className="p-5 pt-2 relative z-20">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight">Neural Linguistics</h2>
              <p className="text-muted text-xs">Target Acquisition: Mar 2025</p>
            </div>
            <div className="text-right">
              <span className="block text-xl font-bold text-white">22%</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="h-1.5 bg-bg rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-cyan/60 to-cyan w-[22%]" />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center border border-cyan/20 shrink-0">
              <Target className="w-4 h-4 text-cyan" />
            </div>
            <p className="text-muted text-xs leading-tight"><span className="text-cyan font-bold">NEXUS:</span> Performance nominal. Consistency streak active for 5 days.</p>
          </div>
          <button className="w-full border border-white/10 text-slate-300 py-2 rounded font-medium text-xs uppercase tracking-wide hover:bg-white/5 hover:text-white transition-colors">
            View Milestones
          </button>
        </div>
      </article>

    </motion.div>
  );
}
