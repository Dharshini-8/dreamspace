import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, dbService } from '../firebase/firebase';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

// Simple dream symbol interpreter to give instant rich interpretations
const interpretSymbols = (title, description, symbols = []) => {
  const symbolDictionary = {
    flying: 'Flying is a strong indicator of lucidity, control, and a desire to escape waking limitations. You are seeking a higher perspective.',
    chased: 'Being chased reflects internal avoidance. There is a challenge or stressor in your waking life that you feel unready to confront.',
    maze: 'A maze suggests feeling disoriented or trapped. You are trying to find the right path in a complex situation in your life.',
    shadow: 'Shadows represent your Jungian "shadow self"—unacknowledged desires, fears, or aspects of your personality you suppress.',
    key: 'A key represents access, solutions, or secrets. You are close to unlocking a breakthrough or resolving a mystery.',
    clock: 'Clocks and time relate to anxiety about deadlines, aging, or a feeling that time is running out in some area of life.',
    ocean: 'The ocean represents the infinite depth of your subconscious mind. Calm water signifies emotional balance; storm waves suggest turbulence.',
    whale: 'A whale represents ancient guidance, deep emotional resilience, and connection to cosmic or maternal wisdom.',
    stars: 'Stars reflect high aspirations, guidance, and a sense of cosmic alignment or destiny.',
    water: 'Water symbolises your emotional state. Clean water shows clarity; muddy water suggests confusion or emotional distress.',
    falling: 'Falling indicates a loss of control, insecurity, or fear of failure in your career, relationship, or personal endeavors.',
    teeth: 'Losing teeth often relates to powerlessness, anxiety about aging, or fear of losing your voice and status.',
    forest: 'A forest represents the unknown, a journey of self-exploration, or feeling lost in your thoughts.',
    money: 'Money represents self-worth, energy exchange, or concerns about security and material success.'
  };

  const findings = [];
  const allText = `${title} ${description}`.toLowerCase();

  // Find match from dictionary or list
  Object.keys(symbolDictionary).forEach(sym => {
    if (allText.includes(sym) || symbols.some(s => s.toLowerCase() === sym)) {
      findings.push(symbolDictionary[sym]);
    }
  });

  if (findings.length === 0) {
    return "This dream presents a unique tapestry of symbols. It indicates a processing of daily events, integrating emotional memories, and resolving minor subconscious thoughts.";
  }

  return findings.join(' ');
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dreams, setDreams] = useState([]);
  const [goals, setGoals] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [fbConfig, setFbConfig] = useState(null);

  // 1. Listen to Auth State
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user data
        try {
          const fetchedDreams = await dbService.getDreams(currentUser.uid);
          const fetchedGoals = await dbService.getGoals(currentUser.uid);
          const fetchedChats = await dbService.getChats(currentUser.uid);

          setDreams(fetchedDreams);
          setGoals(fetchedGoals);
          setChatHistory(fetchedChats[0]?.history || []);
        } catch (e) {
          console.error("Error fetching user data", e);
        }
      } else {
        setDreams([]);
        setGoals([]);
        setChatHistory([]);
      }
      setLoading(false);
    });

    setFbConfig(dbService.getFirebaseConfig());

    return () => unsubscribe();
  }, []);

  // 2. Recalculate Achievements whenever state changes
  useEffect(() => {
    if (!user) {
      setAchievements([]);
      return;
    }

    const dreamCount = dreams.length;
    const lucidCount = dreams.filter(d => d.lucid).length;
    const nightmareCount = dreams.filter(d => d.category === 'Nightmare').length;
    const chatCount = chatHistory.length;
    const completedGoalsCount = goals.filter(g => g.completed).length;

    // Determine unique dates logged
    const uniqueDates = new Set(dreams.map(d => d.date));
    const uniqueDatesCount = uniqueDates.size;

    const badgeList = [
      {
        id: 'badge-1',
        name: 'Initiate Dreamer',
        description: 'Take your first step inside DreamSpace.',
        category: 'Journaling',
        unlocked: dreamCount >= 1,
        progress: Math.min((dreamCount / 1) * 100, 100),
        progressText: `${Math.min(dreamCount, 1)} / 1 dream logged`
      },
      {
        id: 'badge-2',
        name: 'Lucid Traveler',
        description: 'Wake up inside your dream and seize control.',
        category: 'Lucidity',
        unlocked: lucidCount >= 1,
        progress: Math.min((lucidCount / 1) * 100, 100),
        progressText: `${Math.min(lucidCount, 1)} / 1 lucid dream`
      },
      {
        id: 'badge-3',
        name: 'Fear Integrator',
        description: 'Confront and record a nightmare to interpret its symbols.',
        category: 'Psychology',
        unlocked: nightmareCount >= 1,
        progress: Math.min((nightmareCount / 1) * 100, 100),
        progressText: `${Math.min(nightmareCount, 1)} / 1 nightmare analyzed`
      },
      {
        id: 'badge-4',
        name: 'Subconscious Keeper',
        description: 'Log dreams on at least 3 unique calendar days.',
        category: 'Consistency',
        unlocked: uniqueDatesCount >= 3,
        progress: Math.min((uniqueDatesCount / 3) * 100, 100),
        progressText: `${Math.min(uniqueDatesCount, 3)} / 3 days logged`
      },
      {
        id: 'badge-5',
        name: 'Oracle\'s Apprentice',
        description: 'Consult with Morpheus, the AI Dream Coach, to interpret symbols.',
        category: 'Coaching',
        unlocked: chatCount >= 2,
        progress: Math.min((chatCount / 2) * 100, 100),
        progressText: `${Math.min(chatCount, 2)} / 2 messages with Coach`
      },
      {
        id: 'badge-6',
        name: 'Dream Architect',
        description: 'Accomplish a subconscious goal on your Vision Board.',
        category: 'Milestones',
        unlocked: completedGoalsCount >= 1,
        progress: Math.min((completedGoalsCount / 1) * 100, 100),
        progressText: `${Math.min(completedGoalsCount, 1)} / 1 goal completed`
      }
    ];

    setAchievements(badgeList);
  }, [dreams, goals, chatHistory, user]);

  // 3. User Actions
  const login = async (email, password) => {
    console.log("LOGIN CALLED:", email);

    setLoading(true);
    try {
      const u = await authService.login(email, password);
      console.log("LOGIN SUCCESS:", u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, displayName) => {
    setLoading(true);
    try {
      const u = await authService.signUp(email, password, displayName);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      setLoading(false);
    }
  };

  // 4. Dream Actions
  const addDream = async (dreamData) => {
    if (!user) return;
    const interpretation = dreamData.interpretation || interpretSymbols(
      dreamData.title,
      dreamData.description,
      dreamData.symbols
    );
    const fullDream = {
      ...dreamData,
      interpretation
    };
    const newDream = await dbService.addDream(user.uid, fullDream);
    setDreams(prev => [newDream, ...prev]);
    return newDream;
  };

  const updateDream = async (dreamId, updates) => {
    const updated = await dbService.updateDream(dreamId, updates);
    setDreams(prev => prev.map(d => d.id === dreamId ? updated : d));
    return updated;
  };

  const deleteDream = async (dreamId) => {
    await dbService.deleteDream(dreamId);
    setDreams(prev => prev.filter(d => d.id !== dreamId));
    return true;
  };

  // 5. Goal Actions
  const addGoal = async (goalData) => {
    if (!user) return;
    const newGoal = await dbService.addGoal(user.uid, goalData);
    setGoals(prev => [...prev, newGoal]);
    return newGoal;
  };

  const updateGoal = async (goalId, updates) => {
    const updated = await dbService.updateGoal(goalId, updates);
    setGoals(prev => prev.map(g => g.id === goalId ? updated : g));
    return updated;
  };

  const deleteGoal = async (goalId) => {
    await dbService.deleteGoal(goalId);
    setGoals(prev => prev.filter(g => g.id !== goalId));
    return true;
  };

  // 6. Chat Actions
  const saveChats = async (newHistory) => {
    if (!user) return;
    setChatHistory(newHistory);
    await dbService.saveChats(user.uid, newHistory);
  };

  // 7. Dynamic Stats Calculator
  const getDreamStats = () => {
    const total = dreams.length;
    if (total === 0) {
      return {
        total: 0,
        lucidCount: 0,
        lucidPercentage: 0,
        avgSleepQuality: 0,
        avgEmotionScore: 0,
        dominantEmotion: 'N/A',
        categoryBreakdown: {},
        emotionBreakdown: {}
      };
    }

    const lucidCount = dreams.filter(d => d.lucid).length;
    const avgSleepQuality = Math.round(dreams.reduce((acc, d) => acc + (Number(d.sleepQuality) || 0), 0) / total);
    const avgEmotionScore = Math.round(dreams.reduce((acc, d) => acc + (Number(d.emotionScore) || 0), 0) / total);

    const categoryBreakdown = {};
    const emotionBreakdown = {};

    dreams.forEach(d => {
      categoryBreakdown[d.category] = (categoryBreakdown[d.category] || 0) + 1;
      emotionBreakdown[d.emotion] = (emotionBreakdown[d.emotion] || 0) + 1;
    });

    let dominantEmotion = 'N/A';
    let maxCount = 0;
    Object.entries(emotionBreakdown).forEach(([emotion, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantEmotion = emotion;
      }
    });

    return {
      total,
      lucidCount,
      lucidPercentage: Math.round((lucidCount / total) * 100),
      avgSleepQuality,
      avgEmotionScore,
      dominantEmotion,
      categoryBreakdown,
      emotionBreakdown
    };
  };

  // 8. Firebase Configuration Options
  const updateFirebaseConfig = (config) => {
    dbService.saveFirebaseConfig(config);
    setFbConfig(config);
  };

  const clearFirebaseConfig = () => {
    dbService.clearFirebaseConfig();
    setFbConfig(null);
  };

  return (
    <AppContext.Provider value={{
      user,
      loading,
      dreams,
      goals,
      chatHistory,
      achievements,
      fbConfig,
      login,
      signup,
      logout,
      addDream,
      updateDream,
      deleteDream,
      addGoal,
      updateGoal,
      deleteGoal,
      saveChats,
      getDreamStats,
      updateFirebaseConfig,
      clearFirebaseConfig
    }}>
      {children}
    </AppContext.Provider>
  );
};
