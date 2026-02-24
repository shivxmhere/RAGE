import { motion } from 'motion/react';
import { Search, Terminal, FileText, Image as ImageIcon, FileArchive, MoreVertical, FolderOpen } from 'lucide-react';

export default function FileVault() {
  const pinnedFiles = [
    { title: 'Thesis_Draft_v4', type: 'DOCX', size: '2MB', icon: FileText, color: 'text-red-500' },
    { title: 'Physics_Lab_03', type: 'PDF', size: '4.5MB', icon: FileText, color: 'text-green' },
    { title: 'Schematics_Ref', type: 'PNG', size: '1.1MB', icon: ImageIcon, color: 'text-cyan' },
  ];

  const directories = [
    { name: 'MATHEMATICS', items: 12, color: 'border-orange' },
    { name: 'PHYSICS', items: 8, color: 'border-cyan' },
    { name: 'COMPSCI', items: 24, color: 'border-purple' },
    { name: 'HISTORY', items: 5, color: 'border-red-500' },
  ];

  const recentLogs = [
    { title: 'Lecture_Notes_WK12.pdf', time: 'Today, 10:42 AM', icon: FileText, color: 'text-blue-500' },
    { title: 'Research_Data_Final.xlsx', time: 'Yesterday, 14:20 PM', icon: FileText, color: 'text-green' },
    { title: 'Project_Assets_v2.zip', time: 'Mon, 09:15 AM', icon: FileArchive, color: 'text-purple' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6 pb-24 px-4 pt-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 bg-bg z-10 sticky top-0">
        <div className="text-white flex w-12 h-12 shrink-0 items-center justify-center rounded-lg bg-cyan/10 border border-cyan/20">
          <Terminal className="w-6 h-6 text-cyan" />
        </div>
        <h2 className="text-white text-xl font-bold tracking-widest uppercase flex-1 text-center font-mono">THE VAULT</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-full w-10 h-10 text-white hover:bg-cyan/20 transition-colors">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Storage Status */}
      <section className="flex flex-col gap-3 rounded-xl bg-card p-5 border border-white/5 shadow-[0_0_15px_rgba(0,245,255,0.05)]">
        <div className="flex justify-between items-end">
          <h3 className="text-xs font-mono font-bold text-cyan tracking-widest uppercase mb-1">STORAGE STATUS</h3>
          <span className="text-xs font-mono text-muted">ENCRYPTED</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-white text-2xl font-bold leading-none font-mono">2.4<span className="text-sm text-muted ml-1">GB</span></p>
          <p className="text-muted text-sm font-medium font-mono">15 GB TOTAL</p>
        </div>
        <div className="relative w-full h-3 bg-bg rounded-full overflow-hidden border border-white/5">
          <div className="absolute left-0 top-0 h-full bg-cyan shadow-[0_0_10px_#00F5FF] transition-all duration-1000" style={{ width: '16%' }} />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px]" />
        </div>
      </section>

      {/* Pinned Files */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white text-sm font-bold tracking-wider font-mono">PINNED_FILES</h3>
          <button className="text-cyan text-xs font-mono hover:underline">VIEW_ALL</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x hide-scrollbar">
          {pinnedFiles.map((file, i) => (
            <div key={i} className="snap-center shrink-0 w-32 flex flex-col gap-2 group cursor-pointer">
              <div className="aspect-[3/4] w-full rounded-lg bg-card border border-white/5 group-hover:border-cyan transition-all flex items-center justify-center relative overflow-hidden">
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor] ${file.color}`} />
                <file.icon className="w-10 h-10 text-muted group-hover:text-cyan transition-colors" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00F5FF_1px,transparent_1px)] [background-size:8px_8px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white truncate font-mono">{file.title}</span>
                <span className="text-[10px] text-muted font-mono">{file.type} • {file.size}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subject Directories */}
      <section>
        <h3 className="text-white text-sm font-bold tracking-wider font-mono mb-3">SUBJECT_DIRECTORIES</h3>
        <div className="grid grid-cols-2 gap-3">
          {directories.map((dir, i) => (
            <div key={i} className={`relative p-4 rounded-xl bg-card border-l-4 ${dir.color} hover:bg-white/5 transition-colors cursor-pointer group`}>
              <div className="flex justify-between items-start mb-4">
                <FolderOpen className={`w-5 h-5 ${dir.color.replace('border-', 'text-')}`} />
                <span className="text-[10px] font-mono text-muted">{dir.items} ITEMS</span>
              </div>
              <h4 className="text-white font-bold font-mono text-sm">{dir.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Logs */}
      <section>
        <h3 className="text-white text-sm font-bold tracking-wider font-mono mb-3">RECENT_LOGS</h3>
        <div className="flex flex-col gap-0 divide-y divide-white/5 rounded-xl bg-card overflow-hidden border border-white/5">
          {recentLogs.map((log, i) => (
            <div key={i} className="flex items-center p-3 gap-3 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className={`w-10 h-10 rounded bg-bg flex items-center justify-center ${log.color} shrink-0 border border-white/5`}>
                <log.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate font-mono">{log.title}</h4>
                <p className="text-xs text-muted font-mono">{log.time}</p>
              </div>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/10">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
