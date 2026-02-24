import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  tag: 'URGENT' | 'STUDY' | 'HEALTH' | 'OTHER';
  urgency: 'high' | 'medium' | 'low';
}

export interface AppState {
  tasks: Task[];
  moodLogs: { timestamp: number; emoji: string; label: string }[];
  studyHours: number;
  streak: number;
  lastActive: string;
  xp: number;
  level: number;
  chatHistory: { role: 'user' | 'model'; text: string }[];
  goals: any[];
}

const defaultState: AppState = {
  tasks: [
    { id: '1', title: 'Complete Math Assignment', completed: false, tag: 'STUDY', urgency: 'high' },
    { id: '2', title: 'Workout 45 mins', completed: false, tag: 'HEALTH', urgency: 'medium' },
    { id: '3', title: 'Review Physics Notes', completed: false, tag: 'STUDY', urgency: 'high' },
  ],
  moodLogs: [],
  studyHours: 4.5,
  streak: 12,
  lastActive: new Date().toISOString(),
  xp: 1250,
  level: 4,
  chatHistory: [],
  goals: [
    { id: '1', title: 'Ace Physics Midterm', category: 'Academic', deadline: '2026-03-15', progress: 65 },
    { id: '2', title: 'Read 10 Books', category: 'Personal', deadline: '2026-12-31', progress: 20 },
  ],
};

export function useStore() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('rage_os_state');
    if (saved) {
      try {
        return { ...defaultState, ...JSON.parse(saved) };
      } catch (e) {
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('rage_os_state', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const addTask = (task: Task) => {
    setState((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
  };

  const toggleTask = (id: string) => {
    setState((prev) => {
      const newTasks = prev.tasks.map((t) => {
        if (t.id === id) {
          const completed = !t.completed;
          // Add XP if completed
          if (completed) {
            return { ...t, completed };
          }
          return { ...t, completed };
        }
        return t;
      });
      
      const taskWasCompleted = newTasks.find(t => t.id === id)?.completed;
      const xpGain = taskWasCompleted ? 10 : -10;
      
      return {
        ...prev,
        tasks: newTasks,
        xp: Math.max(0, prev.xp + xpGain),
      };
    });
  };

  const addChat = (message: { role: 'user' | 'model'; text: string }) => {
    setState((prev) => ({
      ...prev,
      chatHistory: [...prev.chatHistory, message].slice(-50), // Keep last 50
    }));
  };

  const logMood = (emoji: string, label: string) => {
    setState((prev) => ({
      ...prev,
      moodLogs: [...prev.moodLogs, { timestamp: Date.now(), emoji, label }],
    }));
  };

  return { state, updateState, addTask, toggleTask, addChat, logMood };
}
