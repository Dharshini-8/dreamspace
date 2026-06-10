// Simulated Firebase / LocalStorage service wrapper
// This allows the app to be fully functional out of the box without requiring firebase setup.
// If the user wants to connect real Firebase, they can provide config in the dashboard.

const STORAGE_KEYS = {
  USERS: 'dreamspace_users',
  CURRENT_USER: 'dreamspace_current_user',
  DREAMS: 'dreamspace_dreams',
  GOALS: 'dreamspace_goals',
  CHATS: 'dreamspace_chats',
  FIREBASE_CONFIG: 'dreamspace_fb_config'
};

// --- Helper Functions to read/write simulated database ---
const getStorageItem = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

// Initialize default mock data if empty
const initMockData = () => {
  const dreams = getStorageItem(STORAGE_KEYS.DREAMS, null);
  if (!dreams) {
    const initialDreams = [
      {
        id: 'dream-1',
        userId: 'demo-user',
        title: 'Flying over a neon-lit cyber city',
        description: 'I was soaring between massive skyscrapers glowing with violet and teal light. The air was cool, and I felt completely free. I could control my flight by simply leaning in the direction I wanted to go. Suddenly, I saw a glowing key floating inside a digital clock tower.',
        date: '2026-06-08',
        category: 'Lucid',
        emotion: 'Peaceful',
        emotionScore: 90,
        sleepQuality: 85,
        lucid: true,
        symbols: ['flying', 'city', 'key', 'clock'],
        interpretation: 'Flying represents liberation, rising above challenges, and having a high-level view of your life. The cyber city suggests your thoughts are focused on the future, technology, or structure. The key in the clock indicates that resolving a timing-related obstacle is the key to unlocking your potential.'
      },
      {
        id: 'dream-2',
        userId: 'demo-user',
        title: 'Chased by a shadow figure in a maze',
        description: 'I was running through a labyrinth made of frosted glass panels. Every corner looked identical. I could hear heavy footsteps behind me. I wanted to scream, but no sound came out. The shadow figure never got closer, but I couldn\'t escape.',
        date: '2026-06-07',
        category: 'Nightmare',
        emotion: 'Anxious',
        emotionScore: 20,
        sleepQuality: 40,
        lucid: false,
        symbols: ['chased', 'maze', 'shadow', 'silent'],
        interpretation: 'Being chased by a shadow figure is a classic manifestation of running away from an unacknowledged emotion, fear, or problem in your waking life. The frosted glass maze symbolizes feeling trapped in a situation where the path is visible but inaccessible. Your inability to scream reflects feelings of helplessness or that your voice is not being heard.'
      },
      {
        id: 'dream-3',
        userId: 'demo-user',
        title: 'Conversations with an ancient starry whale',
        description: 'I was swimming in a deep indigo ocean, but I could breathe normally. A colossal humpback whale swam past me, its skin resembling a night sky filled with constellations. It didn\'t speak, but it projected a thought directly into my head: "The stars align when you stop looking for the pattern."',
        date: '2026-06-05',
        category: 'Healing',
        emotion: 'Inspired',
        emotionScore: 95,
        sleepQuality: 90,
        lucid: false,
        symbols: ['ocean', 'whale', 'stars', 'swimming'],
        interpretation: 'The deep ocean represents your vast subconscious mind. Swimming comfortably shows you are in harmony with your deeper self. The starry whale is a powerful archetype of ancient wisdom and cosmic guidance. Its message suggests that you may be over-analyzing a current situation, and that clarity will come naturally once you let go of trying to force a logic onto it.'
      }
    ];
    setStorageItem(STORAGE_KEYS.DREAMS, initialDreams);
  }

  const goals = getStorageItem(STORAGE_KEYS.GOALS, null);
  if (!goals) {
    const initialGoals = [
      {
        id: 'goal-1',
        userId: 'demo-user',
        title: 'Master Lucid Dreaming',
        description: 'Achieve 3 controlled lucid dreams in a single month.',
        category: 'Skill',
        targetDate: '2026-07-31',
        progress: 66,
        completed: false
      },
      {
        id: 'goal-2',
        userId: 'demo-user',
        title: 'Understand Recurring Maze Dream',
        description: 'Decode the shadow figure and escape the maze in my subconscious.',
        category: 'Integration',
        targetDate: '2026-06-30',
        progress: 40,
        completed: false
      },
      {
        id: 'goal-3',
        userId: 'demo-user',
        title: 'Log Dreams Daily',
        description: 'Maintain a 7-day dream logging streak.',
        category: 'Habit',
        targetDate: '2026-06-15',
        progress: 100,
        completed: true
      }
    ];
    setStorageItem(STORAGE_KEYS.GOALS, initialGoals);
  }
};

initMockData();

// --- AUTH SERVICE ---
export const authService = {
  signUp: async (email, password, displayName = 'Dreamer') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getStorageItem(STORAGE_KEYS.USERS);
    if (users.some(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      uid: 'user_' + Math.random().toString(36).substr(2, 9),
      email,
      displayName,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    setStorageItem(STORAGE_KEYS.USERS, users);
    setStorageItem(STORAGE_KEYS.CURRENT_USER, newUser);
    return newUser;
  },

  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple demo bypass
    if (email === 'demo@dreamspace.com' && password === 'dreamer123') {
      const demoUser = {
        uid: 'demo-user',
        email: 'demo@dreamspace.com',
        displayName: 'Neo Dreamer',
        createdAt: new Date().toISOString()
      };
      setStorageItem(STORAGE_KEYS.CURRENT_USER, demoUser);
      return demoUser;
    }

    const users = getStorageItem(STORAGE_KEYS.USERS);
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found. Use demo@dreamspace.com / dreamer123 or sign up!');
    }

    setStorageItem(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return true;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  onAuthStateChanged: (callback) => {
    const checkAuth = () => {
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      callback(user ? JSON.parse(user) : null);
    };

    checkAuth();
    // Listen to changes (handy for multi-tab or simulated state changes)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }
};

// --- DATABASE SERVICE (FIRESTORE MOCK) ---
export const dbService = {
  // Dreams
  getDreams: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const dreams = getStorageItem(STORAGE_KEYS.DREAMS);
    return dreams.filter(d => d.userId === userId);
  },

  addDream: async (userId, dreamData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const dreams = getStorageItem(STORAGE_KEYS.DREAMS);
    const newDream = {
      ...dreamData,
      id: 'dream_' + Math.random().toString(36).substr(2, 9),
      userId,
      createdAt: new Date().toISOString()
    };
    dreams.unshift(newDream); // Newest first
    setStorageItem(STORAGE_KEYS.DREAMS, dreams);
    return newDream;
  },

  updateDream: async (dreamId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const dreams = getStorageItem(STORAGE_KEYS.DREAMS);
    const idx = dreams.findIndex(d => d.id === dreamId);
    if (idx === -1) throw new Error('Dream not found');

    dreams[idx] = { ...dreams[idx], ...updates };
    setStorageItem(STORAGE_KEYS.DREAMS, dreams);
    return dreams[idx];
  },

  deleteDream: async (dreamId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    let dreams = getStorageItem(STORAGE_KEYS.DREAMS);
    dreams = dreams.filter(d => d.id !== dreamId);
    setStorageItem(STORAGE_KEYS.DREAMS, dreams);
    return true;
  },

  // Goals (Dream Board)
  getGoals: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const goals = getStorageItem(STORAGE_KEYS.GOALS);
    return goals.filter(g => g.userId === userId);
  },

  addGoal: async (userId, goalData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const goals = getStorageItem(STORAGE_KEYS.GOALS);
    const newGoal = {
      ...goalData,
      id: 'goal_' + Math.random().toString(36).substr(2, 9),
      userId,
      progress: goalData.progress || 0,
      completed: goalData.completed || false
    };
    goals.push(newGoal);
    setStorageItem(STORAGE_KEYS.GOALS, goals);
    return newGoal;
  },

  updateGoal: async (goalId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const goals = getStorageItem(STORAGE_KEYS.GOALS);
    const idx = goals.findIndex(g => g.id === goalId);
    if (idx === -1) throw new Error('Goal not found');

    goals[idx] = { ...goals[idx], ...updates };
    setStorageItem(STORAGE_KEYS.GOALS, goals);
    return goals[idx];
  },

  deleteGoal: async (goalId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let goals = getStorageItem(STORAGE_KEYS.GOALS);
    goals = goals.filter(g => g.id !== goalId);
    setStorageItem(STORAGE_KEYS.GOALS, goals);
    return true;
  },

  // Chats (AI Coach)
  getChats: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const chats = getStorageItem(STORAGE_KEYS.CHATS);
    return chats.filter(c => c.userId === userId);
  },

  saveChats: async (userId, chatHistory) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let chats = getStorageItem(STORAGE_KEYS.CHATS);
    // Remove previous history for user
    chats = chats.filter(c => c.userId !== userId);
    // Add updated history
    const userChats = {
      userId,
      history: chatHistory,
      updatedAt: new Date().toISOString()
    };
    chats.push(userChats);
    setStorageItem(STORAGE_KEYS.CHATS, chats);
    return userChats;
  },

  // Firebase Config Setup
  getFirebaseConfig: () => {
    const config = localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG);
    return config ? JSON.parse(config) : null;
  },

  saveFirebaseConfig: (config) => {
    setStorageItem(STORAGE_KEYS.FIREBASE_CONFIG, config);
  },

  clearFirebaseConfig: () => {
    localStorage.removeItem(STORAGE_KEYS.FIREBASE_CONFIG);
  }
};
