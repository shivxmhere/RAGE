import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Calendar, BrainCircuit, BarChart2, User, FolderOpen, Target } from 'lucide-react';

import BootScreen from './components/BootScreen';
import Home from './components/Home';
import Timetable from './components/Timetable';
import RageAI from './components/RageAI';
import LifeDashboard from './components/LifeDashboard';
import FileVault from './components/FileVault';
import Goals from './components/Goals';
import Profile from './components/Profile';
import { useStore } from './hooks/useStore';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeScreen, setActiveScreen] = useState('home');
  const [isIdle, setIsIdle] = useState(false);
  const { state } = useStore();

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 60000); // 60s idle
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    
    resetIdle();

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      clearTimeout(idleTimer);
    };
  }, []);

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <Home />;
      case 'timetable': return <Timetable />;
      case 'ai': return <RageAI />;
      case 'dashboard': return <LifeDashboard />;
      case 'vault': return <FileVault />;
      case 'goals': return <Goals />;
      case 'profile': return <Profile />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text font-mono relative overflow-hidden flex flex-col max-w-md mx-auto shadow-2xl border-x border-white/5">
      {/* Idle Alert Vignette */}
      <AnimatePresence>
        {isIdle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="idle-vignette"
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Idle Toast */}
      <AnimatePresence>
        {isIdle && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto"
          >
            <div className="bg-card border border-orange shadow-[0_0_20px_rgba(255,107,53,0.3)] rounded-lg p-4 flex items-center gap-3 mx-4">
              <div className="flex-shrink-0 bg-orange text-bg rounded-full p-1">
                <Target className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-bold">System Alert</p>
                <p className="text-slate-300 text-xs">You've been idle. Time to level up!</p>
              </div>
              <button 
                onClick={() => setIsIdle(false)}
                className="text-orange font-bold text-sm uppercase tracking-wider hover:text-white transition-colors"
              >
                Engage
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-bg/90 backdrop-blur-xl border-t border-white/5 z-50 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-end pb-4 pt-3 px-2">
          <button onClick={() => setActiveScreen('home')} className={`flex flex-col items-center gap-1.5 flex-1 transition-colors ${activeScreen === 'home' ? 'text-cyan' : 'text-muted hover:text-white'}`}>
            <div className="h-6 flex items-center justify-center relative">
              {activeScreen === 'home' && <span className="absolute -top-3 w-1 h-1 bg-cyan rounded-full shadow-[0_0_5px_#00F5FF]" />}
              <LayoutGrid className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase">Base</span>
          </button>
          
          <button onClick={() => setActiveScreen('timetable')} className={`flex flex-col items-center gap-1.5 flex-1 transition-colors ${activeScreen === 'timetable' ? 'text-cyan' : 'text-muted hover:text-white'}`}>
            <div className="h-6 flex items-center justify-center relative">
              {activeScreen === 'timetable' && <span className="absolute -top-3 w-1 h-1 bg-cyan rounded-full shadow-[0_0_5px_#00F5FF]" />}
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase">Plan</span>
          </button>

          <button onClick={() => setActiveScreen('ai')} className="flex flex-col items-center gap-1 flex-1 relative -top-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-transform duration-300 border-4 border-bg ${activeScreen === 'ai' ? 'bg-cyan text-bg scale-110' : 'bg-card text-cyan border-cyan/30'}`}>
              <BrainCircuit className="w-7 h-7" />
            </div>
          </button>

          <button onClick={() => setActiveScreen('dashboard')} className={`flex flex-col items-center gap-1.5 flex-1 transition-colors ${activeScreen === 'dashboard' ? 'text-cyan' : 'text-muted hover:text-white'}`}>
            <div className="h-6 flex items-center justify-center relative">
              {activeScreen === 'dashboard' && <span className="absolute -top-3 w-1 h-1 bg-cyan rounded-full shadow-[0_0_5px_#00F5FF]" />}
              <BarChart2 className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase">Stats</span>
          </button>

          <button onClick={() => setActiveScreen('profile')} className={`flex flex-col items-center gap-1.5 flex-1 transition-colors ${activeScreen === 'profile' ? 'text-cyan' : 'text-muted hover:text-white'}`}>
            <div className="h-6 flex items-center justify-center relative">
              {activeScreen === 'profile' && <span className="absolute -top-3 w-1 h-1 bg-cyan rounded-full shadow-[0_0_5px_#00F5FF]" />}
              <User className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase">ID</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

