import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Grid, 
  Clock, 
  BookOpen, 
  MessageSquare, 
  Award, 
  LogOut, 
  Settings, 
  Sparkles, 
  X, 
  Check, 
  Database,
  CloudLightning
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { user, logout, fbConfig, updateFirebaseConfig, clearFirebaseConfig } = useApp();
  const [showConfigModal, setShowConfigModal] = useState(false);
  
  // Firebase configuration form states
  const [apiKey, setApiKey] = useState(fbConfig?.apiKey || '');
  const [authDomain, setAuthDomain] = useState(fbConfig?.authDomain || '');
  const [projectId, setProjectId] = useState(fbConfig?.projectId || '');
  const [storageBucket, setStorageBucket] = useState(fbConfig?.storageBucket || '');
  const [messagingSenderId, setMessagingSenderId] = useState(fbConfig?.messagingSenderId || '');
  const [appId, setAppId] = useState(fbConfig?.appId || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'board', name: 'Dream Board', icon: Grid },
    { id: 'timeline', name: 'Dream Timeline', icon: Clock },
    { id: 'journal', name: 'Vision Journal', icon: BookOpen },
    { id: 'coach', name: 'AI Dream Coach', icon: MessageSquare, badge: 'AI' },
    { id: 'achievements', name: 'Achievements', icon: Award },
  ];

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (!apiKey || !projectId) {
      alert("API Key and Project ID are required for Firebase initialization.");
      return;
    }
    updateFirebaseConfig({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowConfigModal(false);
    }, 1200);
  };

  const handleClearConfig = () => {
    if (confirm("Are you sure you want to return to LocalStorage Simulation Mode?")) {
      clearFirebaseConfig();
      setApiKey('');
      setAuthDomain('');
      setProjectId('');
      setStorageBucket('');
      setMessagingSenderId('');
      setAppId('');
      setShowConfigModal(false);
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-white/10 bg-dream-bg/40 backdrop-blur-xl px-4 py-6 md:flex z-40">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-dream-purple to-dream-blue shadow-glass-glow">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-dream-text">
              DreamSpace
            </h1>
            <span className="text-xs text-dream-teal font-medium tracking-widest uppercase block">
              Subconscious Hub
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`relative flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-dream-purple/20 to-dream-blue/10 border border-dream-purple/30 text-white shadow-neon-purple/20'
                    : 'text-dream-muted border border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-dream-teal' : 'text-dream-muted group-hover:text-dream-purple'
                }`} />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="absolute right-4 rounded-full bg-gradient-to-r from-dream-pink to-dream-purple px-1.5 py-0.5 text-[9px] font-bold text-white shadow-neon-purple/30">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-full bg-dream-teal" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Settings & Auth Profile */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          {/* Database Toggle Info */}
          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center justify-between w-full rounded-xl bg-white/5 border border-white/5 p-3 text-xs text-dream-muted hover:border-dream-purple/30 hover:bg-white/10 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-2">
              {fbConfig ? (
                <CloudLightning className="h-4 w-4 text-dream-teal" />
              ) : (
                <Database className="h-4 w-4 text-dream-purple" />
              )}
              <div>
                <span className="font-semibold text-white block">
                  {fbConfig ? 'Firebase Real' : 'Simulated DB'}
                </span>
                <span className="text-[10px] block opacity-70">
                  {fbConfig ? 'Connected to Project' : 'Using Local Storage'}
                </span>
              </div>
            </div>
            <Settings className="h-4 w-4 text-dream-muted hover:rotate-45 transition-transform duration-300" />
          </button>

          {/* User card */}
          <div className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/5 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-dream-purple/20 border border-dream-purple/30 font-bold text-dream-teal text-sm shadow-inner">
                {user.displayName?.charAt(0) || 'D'}
              </div>
              <div className="max-w-[110px]">
                <h4 className="truncate text-xs font-semibold text-white leading-tight">
                  {user.displayName || 'Dreamer'}
                </h4>
                <span className="truncate text-[10px] text-dream-muted block leading-none">
                  {user.email}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="rounded-lg p-1.5 text-dream-muted hover:text-dream-pink hover:bg-white/5 transition-all duration-300"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-dream-bg/70 backdrop-blur-xl px-4 py-2 flex justify-around items-center md:hidden z-40">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center rounded-xl p-2 transition-all duration-300 ${
                isActive ? 'text-dream-teal scale-110' : 'text-dream-muted'
              }`}
            >
              <Icon className="h-5.5 w-5.5" />
              <span className="text-[9px] mt-1 font-medium">{item.name}</span>
            </button>
          );
        })}
        
        {/* Mobile Settings Button */}
        <button
          onClick={() => setShowConfigModal(true)}
          className={`flex flex-col items-center justify-center rounded-xl p-2 text-dream-muted`}
        >
          <Settings className="h-5.5 w-5.5" />
          <span className="text-[9px] mt-1 font-medium">Config</span>
        </button>

        {/* Mobile Logout Button */}
        <button
          onClick={logout}
          className={`flex flex-col items-center justify-center rounded-xl p-2 text-dream-muted hover:text-dream-pink`}
        >
          <LogOut className="h-5.5 w-5.5" />
          <span className="text-[9px] mt-1 font-medium">Exit</span>
        </button>
      </nav>

      {/* Dynamic Firebase Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel max-w-md w-full rounded-3xl p-6 relative animate-float shadow-glass-glow border border-white/10">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute right-4 top-4 text-dream-muted hover:text-white rounded-lg p-1 hover:bg-white/5 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-dream-purple/20 border border-dream-purple/40 flex items-center justify-center text-dream-teal shadow-inner">
                <Database className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Firebase Credentials</h3>
                <p className="text-xs text-dream-muted">
                  Toggle database mode by configuring your keys below.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                  API Key *
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full glass-input text-sm py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                    Project ID *
                  </label>
                  <input
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder="dreamspace-app"
                    className="w-full glass-input text-sm py-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                    Auth Domain
                  </label>
                  <input
                    type="text"
                    value={authDomain}
                    onChange={(e) => setAuthDomain(e.target.value)}
                    placeholder="dreamspace.firebaseapp.com"
                    className="w-full glass-input text-sm py-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                  Storage Bucket
                </label>
                <input
                  type="text"
                  value={storageBucket}
                  onChange={(e) => setStorageBucket(e.target.value)}
                  placeholder="dreamspace.appspot.com"
                  className="w-full glass-input text-sm py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                    Sender ID
                  </label>
                  <input
                    type="text"
                    value={messagingSenderId}
                    onChange={(e) => setMessagingSenderId(e.target.value)}
                    placeholder="123456789"
                    className="w-full glass-input text-sm py-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                    App ID
                  </label>
                  <input
                    type="text"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    placeholder="1:123:web:abc"
                    className="w-full glass-input text-sm py-2"
                  />
                </div>
              </div>

              {saveSuccess ? (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-dream-teal/10 border border-dream-teal/30 p-3 text-sm text-dream-teal font-semibold animate-pulse">
                  <Check className="h-5 w-5" />
                  Configuration Saved. Initializing Backend...
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClearConfig}
                    className="flex-1 btn-neon-border text-xs py-2 bg-red-950/20 hover:bg-red-900/10 border-red-500/20 text-red-400 hover:border-red-500 transition-all duration-300"
                  >
                    Reset Simulation
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-neon-purple text-xs py-2"
                  >
                    Activate Credentials
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
