import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DreamBoard from './pages/DreamBoard';
import DreamTimeline from './pages/DreamTimeline';
import VisionJournal from './pages/VisionJournal';
import AICoach from './pages/AICoach';
import AchievementGallery from './pages/AchievementGallery';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const { user, loading } = useApp();
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedDreamId, setSelectedDreamId] = useState(null);

  if (loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-dream-bg gap-4">
        {/* Futuristic glowing loading spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-dream-purple/20" />
          <div className="absolute inset-0 rounded-full border-4 border-dream-teal border-t-transparent animate-spin shadow-neon-teal" />
        </div>
        <span className="font-display text-sm text-dream-muted uppercase tracking-widest animate-pulse">
          Opening DreamSpace Portal...
        </span>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  // Define transition options
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <Dashboard setActivePage={setActivePage} setSelectedDreamId={setSelectedDreamId} />
          </motion.div>
        );
      case 'board':
        return (
          <motion.div key="board" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <DreamBoard />
          </motion.div>
        );
      case 'timeline':
        return (
          <motion.div key="timeline" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <DreamTimeline selectedDreamId={selectedDreamId} setSelectedDreamId={setSelectedDreamId} />
          </motion.div>
        );
      case 'journal':
        return (
          <motion.div key="journal" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <VisionJournal />
          </motion.div>
        );
      case 'coach':
        return (
          <motion.div key="coach" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <AICoach />
          </motion.div>
        );
      case 'achievements':
        return (
          <motion.div key="achievements" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <AchievementGallery />
          </motion.div>
        );
      default:
        return (
          <motion.div key="fallback" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
            <Dashboard setActivePage={setActivePage} setSelectedDreamId={setSelectedDreamId} />
          </motion.div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-dream-bg text-dream-text bg-grid-pattern">
      {/* Sidebar navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main content frame */}
      <main className="flex-1 md:pl-72 px-4 py-8 md:pr-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
