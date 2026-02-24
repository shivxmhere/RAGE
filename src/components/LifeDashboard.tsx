import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Activity, Brain, Zap } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export default function LifeDashboard() {
  const { state } = useStore();

  const radarData = [
    { subject: 'STUDY', A: 85, fullMark: 100 },
    { subject: 'HEALTH', A: 65, fullMark: 100 },
    { subject: 'SOCIAL', A: 40, fullMark: 100 },
    { subject: 'SLEEP', A: 70, fullMark: 100 },
    { subject: 'CREATE', A: 50, fullMark: 100 },
    { subject: 'FOCUS', A: 90, fullMark: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6 pb-24 px-4 pt-6"
    >
      {/* Header */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight uppercase">LIFE RADAR</h2>
          <p className="text-xs text-cyan font-mono uppercase">Biometric & Academic Sync</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">85%</p>
          <p className="text-[10px] text-muted uppercase tracking-wider">Optimal State</p>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="relative w-full aspect-square max-w-[340px] mx-auto my-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#204a4b" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#8dccce', fontSize: 10, fontFamily: 'Space Grotesk', fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Shivam"
              dataKey="A"
              stroke="#00f6ff"
              fill="rgba(0, 246, 255, 0.15)"
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 w-full">
        <div className="bg-card p-3 rounded border border-white/5 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(0,245,255,0.05)]">
          <span className="text-cyan text-lg font-bold font-mono">{state.studyHours}h</span>
          <span className="text-[10px] text-muted uppercase tracking-widest">Study Time</span>
        </div>
        <div className="bg-card p-3 rounded border border-white/5 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.05)]">
          <span className="text-purple text-lg font-bold font-mono">94</span>
          <span className="text-[10px] text-muted uppercase tracking-widest">Focus Score</span>
        </div>
        <div className="bg-card p-3 rounded border border-white/5 flex flex-col items-center justify-center shadow-[0_0_10px_rgba(57,255,20,0.05)]">
          <span className="text-green text-lg font-bold font-mono">7h</span>
          <span className="text-[10px] text-muted uppercase tracking-widest">Avg Sleep</span>
        </div>
      </div>

      {/* NEXUS Analysis */}
      <div className="rounded-xl bg-gradient-to-br from-[#1a1225] to-card p-[1px] shadow-[0_0_15px_rgba(168,85,247,0.2)]">
        <div className="h-full w-full rounded-xl bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2 uppercase">
              <Brain className="w-5 h-5 text-purple" />
              RAGE ANALYSIS
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple/20 text-purple border border-purple/30">AI ACTIVE</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="h-12 w-1 rounded bg-purple shrink-0" />
              <div>
                <p className="text-sm text-muted mb-1 font-mono">Pattern Recognition</p>
                <p className="text-sm text-white leading-relaxed">
                  Productivity spike detected in <span className="text-purple font-bold">0400-0800</span> sector. Suggest re-allocation of deep work resources to early morning block.
                </p>
              </div>
            </div>
            <button className="mt-2 w-full rounded bg-purple/10 hover:bg-purple/20 border border-purple/50 py-2 text-xs font-bold text-purple transition-colors uppercase tracking-wider flex items-center justify-center gap-2">
              View Full Report
            </button>
          </div>
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-card rounded-xl p-5 border border-white/5">
        <h3 className="text-white font-bold text-base tracking-wide mb-4 uppercase">RESOURCE ALLOCATION</h3>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-white">Academic</span>
              <span className="text-cyan font-bold">65%</span>
            </div>
            <div className="flex h-2 w-full rounded-full overflow-hidden bg-bg border border-white/5">
              <div className="w-[65%] bg-cyan shadow-[0_0_8px_#00f6ff]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-white">Physical Maintenance</span>
              <span className="text-green font-bold">20%</span>
            </div>
            <div className="flex h-2 w-full rounded-full overflow-hidden bg-bg border border-white/5">
              <div className="w-[20%] bg-green shadow-[0_0_8px_#39FF14]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-white">Social / Leisure</span>
              <span className="text-purple font-bold">15%</span>
            </div>
            <div className="flex h-2 w-full rounded-full overflow-hidden bg-bg border border-white/5">
              <div className="w-[15%] bg-purple shadow-[0_0_8px_#7C3AED]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
