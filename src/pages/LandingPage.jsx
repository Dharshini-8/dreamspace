import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Moon, Star, BookOpen, Key, Activity, Heart, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const { login, signup } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    console.log("Demo clicked");
    setError('');
    setLoading(true);

    try {
      await login('dharshini@dreamspace.com', 'dreamer123');
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const features = [
    { icon: BookOpen, title: 'Vision Journal', desc: 'Log and catalog your dreams, tracking sleep patterns and emotions.' },
    { icon: Activity, title: 'Dream Dashboard', desc: 'Visualize sleep statistics, categories, and dominant subconscious moods.' },
    { icon: Heart, title: 'AI Dream Coach', desc: 'Interact with Morpheus, parsing recurring symbols and meanings.' },
    { icon: Key, title: 'Achievement Gallery', desc: 'Unlock subconscious badges and trace consistency milestones.' }
  ];

  return (
    <div className="relative min-h-screen w-full bg-dot-pattern flex flex-col items-center justify-center p-4 overflow-hidden">

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-dream-purple/15 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-dream-blue/15 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-dream-teal/10 blur-[100px] animate-float" />

      {/* Content wrapper */}
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row gap-12 items-center justify-between z-10 py-10">

        {/* Left Side: Copy and Features */}
        <div className="flex-1 text-left space-y-6 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-dream-purple/20 to-dream-blue/20 border border-dream-purple/30 px-4 py-1.5 text-xs text-dream-teal font-semibold shadow-inner">
            <Sparkles className="h-4 w-4 animate-spin-slow" />
            <span>Discover Your Inner Cosmos</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-dream-text to-dream-purple leading-tight">
            Visualize your subconscious in <span className="text-neon-glow-teal text-dream-teal">DreamSpace</span>.
          </h2>

          <p className="text-dream-muted text-base md:text-lg leading-relaxed">
            Record dreams, build vision boards, discover recurring symbols, and speak with an AI Dream Coach. Unlock the secrets of your mind.
          </p>

          {/* Feature highlights grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="glass-panel rounded-2xl p-4 border border-white/5 bg-white/3 hover:border-dream-purple/20 transition-all duration-300">
                  <div className="h-9 w-9 rounded-xl bg-dream-purple/10 border border-dream-purple/20 flex items-center justify-center text-dream-teal mb-2">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 font-display">{feat.title}</h4>
                  <p className="text-xs text-dream-muted leading-tight">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Auth Form Glass Card */}
        <div className="w-full max-w-md">
          <div className="glass-panel rounded-3xl p-8 shadow-glass border border-white/10 relative overflow-hidden backdrop-blur-2xl">
            {/* Top decorative glass ring */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full border border-white/5 bg-white/3 blur-xl pointer-events-none" />

            <div className="text-center mb-6">
              <h3 className="text-2xl font-black font-display tracking-wide text-white">
                {isLogin ? 'ENTER DREAMSPACE' : 'JOIN THE ARCHIVE'}
              </h3>
              <p className="text-xs text-dream-muted mt-1">
                {isLogin ? 'Sign in to access your subconscious' : 'Create an account to begin your journey'}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-950/40 border border-red-500/30 p-3 text-xs text-red-300 text-center font-medium animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="E.g., Dharshini, Ashwin"
                    className="w-full glass-input text-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full glass-input text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full glass-input text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-neon-purple mt-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <span className="relative bg-[#110c1c]/90 px-3 text-[10px] font-bold text-dream-muted uppercase tracking-widest">
                Fast Access
              </span>
            </div>

            {/* Instant Demo Access Button */}
            <button
              onClick={handleDemoSignIn}
              disabled={loading}
              className="w-full btn-neon-border py-2.5 flex items-center justify-center gap-2 text-xs border-dream-teal/40 hover:bg-dream-teal/10 hover:border-dream-teal/70"
            >
              <Sparkles className="h-4 w-4 text-dream-teal animate-pulse" />
              <span>Explore with Demo Account</span>
            </button>

            {/* Switch Mode Link */}
            <p className="mt-5 text-center text-xs text-dream-muted">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="font-bold text-dream-teal hover:underline hover:text-white transition-all duration-200"
              >
                {isLogin ? 'Sign up free' : 'Log in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
