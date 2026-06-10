import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Moon, 
  Activity, 
  Heart, 
  Calendar, 
  Flame, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';

export default function Dashboard({ setActivePage, setSelectedDreamId }) {
  const { dreams, getDreamStats, user } = useApp();
  const stats = getDreamStats();
  const [selectedDream, setSelectedDream] = useState(null);

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'Peaceful': return 'text-dream-teal border-dream-teal/30 bg-dream-teal/5';
      case 'Anxious': return 'text-dream-pink border-dream-pink/30 bg-dream-pink/5';
      case 'Inspired': return 'text-dream-purple border-dream-purple/30 bg-dream-purple/5';
      case 'Scared': return 'text-red-400 border-red-500/30 bg-red-500/5';
      case 'Confused': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5';
      default: return 'text-dream-blue border-dream-blue/30 bg-dream-blue/5';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Lucid': return 'bg-gradient-to-r from-dream-teal/20 to-dream-blue/20 text-dream-teal border-dream-teal/30';
      case 'Nightmare': return 'bg-gradient-to-r from-dream-pink/20 to-red-500/10 text-dream-pink border-dream-pink/30';
      case 'Healing': return 'bg-gradient-to-r from-dream-purple/20 to-indigo-500/10 text-dream-purple border-dream-purple/30';
      default: return 'bg-gradient-to-r from-gray-800 to-gray-700 text-dream-muted border-white/5';
    }
  };

  const recentDreams = dreams.slice(0, 3);

  // Generate a premium dynamic AI advice text based on user's dreams
  const getAIAdvice = () => {
    if (dreams.length === 0) {
      return "Welcome! Speak to the AI Dream Coach in the chat portal or write down your first dream to receive custom subconscious insights.";
    }

    const hasNightmare = dreams.some(d => d.category === 'Nightmare');
    const hasLucid = dreams.some(d => d.lucid);
    const avgSleep = stats.avgSleepQuality;

    if (hasNightmare && avgSleep < 60) {
      return "Notice: Your recent nightmare patterns correspond with lower sleep indexes. Morpheus recommends detailing the shadow figures in your Vision Journal to release somatic tension.";
    }
    if (hasLucid) {
      return "Subconscious Active: You show strong prefrontal activation during sleep (lucidity). Utilize the Dream Board to map your next flight destinations and anchor your intentions.";
    }
    return "Insight: Your dream journal indicates balanced emotional processing. The dominant emotion is '" + stats.dominantEmotion + "'. Keep writing to expand your symbol catalog.";
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      
      {/* Header Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-dream-text">
            WELCOME BACK, {user?.displayName?.toUpperCase() || 'DREAMER'}
          </h2>
          <p className="text-xs md:text-sm text-dream-muted">
            Track metrics and decode insights from your sleep cycles.
          </p>
        </div>
        <button
          onClick={() => setActivePage('journal')}
          className="btn-neon-purple flex items-center justify-center gap-2 self-start md:self-auto text-xs py-2.5"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>New Journal Entry</span>
        </button>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Dreams Logged', value: stats.total, sub: 'Total Archive', icon: Moon, color: 'text-dream-purple shadow-neon-purple/20' },
          { label: 'Lucid Index', value: `${stats.lucidPercentage}%`, sub: `${stats.lucidCount} Controlled`, icon: Sparkles, color: 'text-dream-teal shadow-neon-teal/20' },
          { label: 'Sleep Efficiency', value: `${stats.avgSleepQuality}%`, sub: 'Average Quality', icon: Activity, color: 'text-dream-blue shadow-neon-blue/20' },
          { label: 'Dominant Vibe', value: stats.dominantEmotion, sub: 'Subconscious Mood', icon: Heart, color: 'text-dream-pink shadow-neon-pink/20' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel rounded-2xl p-4 md:p-5 border border-white/5 bg-white/2 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-xs font-bold text-dream-muted uppercase tracking-wider">{stat.label}</span>
                <div className={`h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-3xl font-black text-white font-display tracking-tight">{stat.value}</h3>
                <span className="text-[10px] text-dream-muted opacity-80">{stat.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mid Section: AI Insights and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Holographic AI Insight */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-6 relative overflow-hidden border border-dream-purple/20 bg-gradient-to-br from-dream-purple/5 to-dream-blue/5">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-dream-purple/10 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-xl bg-dream-purple/20 border border-dream-purple/40 flex items-center justify-center text-dream-teal">
              <Brain className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-white">MORPHEUS INSIGHTS</h4>
              <p className="text-[10px] text-dream-muted uppercase tracking-widest">AI Subconscious Coach</p>
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-4 bg-black/30 border border-white/5 text-sm leading-relaxed text-dream-text/90 italic">
            "{getAIAdvice()}"
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setActivePage('coach')}
              className="inline-flex items-center gap-1.5 text-xs text-dream-teal font-semibold hover:text-white transition-colors duration-200"
            >
              <span>Speak to Coach</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between border border-white/5 bg-white/2">
          <div>
            <h4 className="text-sm font-bold font-display text-white mb-4">DREAM CATEGORIES</h4>
            {dreams.length === 0 ? (
              <p className="text-xs text-dream-muted italic text-center py-6">No categorised data available.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(stats.categoryBreakdown).map(([cat, count]) => {
                  const percent = Math.round((count / stats.total) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-white">{cat}</span>
                        <span className="text-dream-muted">{count} ({percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-dream-purple to-dream-blue rounded-full shadow-neon-purple"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {dreams.length > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] text-dream-muted pt-4 border-t border-white/5">
              <TrendingUp className="h-3.5 w-3.5 text-dream-teal" />
              <span>Tracking {Object.keys(stats.categoryBreakdown).length} distinct psychological categories.</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Recent Dream Logs Feed */}
      <div className="glass-panel rounded-3xl p-6 border border-white/5 bg-white/1">
        <div className="flex items-center justify-between mb-5">
          <h4 className="text-sm font-bold font-display text-white">RECENT ENTRIES</h4>
          <button
            onClick={() => setActivePage('journal')}
            className="text-xs text-dream-teal font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {dreams.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-white/2 border border-dashed border-white/10">
            <p className="text-sm text-dream-muted italic">The dream archive is currently empty.</p>
            <button
              onClick={() => setActivePage('journal')}
              className="btn-neon-border text-xs py-2 mt-4 inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create First Entry</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentDreams.map((dream) => (
              <div 
                key={dream.id} 
                className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/5 flex flex-col justify-between text-left relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-dream-muted flex items-center gap-1 uppercase">
                      <Calendar className="h-3 w-3" />
                      {dream.date}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] border font-bold uppercase ${getCategoryColor(dream.category)}`}>
                      {dream.category}
                    </span>
                  </div>
                  
                  <h5 className="font-bold text-base text-white line-clamp-1 mb-2 font-display">
                    {dream.title}
                  </h5>
                  
                  <p className="text-xs text-dream-muted line-clamp-3 mb-4 leading-relaxed">
                    {dream.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${getEmotionColor(dream.emotion)}`}>
                    {dream.emotion}
                  </span>
                  
                  <button
                    onClick={() => {
                      setSelectedDreamId(dream.id);
                      setActivePage('timeline'); // Switch to timeline which will focus and open this dream
                    }}
                    className="text-[11px] font-semibold text-dream-teal hover:text-white transition-colors duration-200"
                  >
                    Open Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
