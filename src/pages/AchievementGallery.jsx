import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Lock, Unlock, Sparkles, Trophy, Flame, Moon, Star } from 'lucide-react';

export default function AchievementGallery() {
  const { achievements, dreams, getDreamStats } = useApp();
  const stats = getDreamStats();

  const unlockedCount = achievements.filter(b => b.unlocked).length;
  const totalCount = achievements.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100) || 0;

  const getBadgeCategoryGlow = (cat) => {
    switch (cat) {
      case 'Journaling': return 'shadow-neon-blue border-dream-blue/30 text-dream-blue';
      case 'Lucidity': return 'shadow-neon-teal border-dream-teal/30 text-dream-teal';
      case 'Psychology': return 'shadow-neon-pink border-dream-pink/30 text-dream-pink';
      default: return 'shadow-neon-purple border-dream-purple/30 text-dream-purple';
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 text-left">
      
      {/* Header Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-dream-text">
            ACHIEVEMENTS
          </h2>
          <p className="text-xs md:text-sm text-dream-muted">
            Track and unlock sub-conscious milestones inside DreamSpace.
          </p>
        </div>
      </div>

      {/* Progress overview banner */}
      <div className="glass-panel rounded-3xl p-6 border border-dream-purple/20 bg-gradient-to-r from-dream-purple/10 via-dream-blue/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6 shadow-glass">
        <div className="flex items-center gap-4 text-left">
          <div className="h-14 w-14 rounded-2xl bg-dream-purple/20 border border-dream-purple/40 flex items-center justify-center text-dream-teal animate-float shadow-inner">
            <Trophy className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">SUBCONSCIOUS PROGRESS</h3>
            <p className="text-xs text-dream-muted mt-1 leading-tight">
              Unlocked <strong className="text-dream-teal">{unlockedCount}</strong> of <strong className="text-white">{totalCount}</strong> cosmic archives milestones.
            </p>
          </div>
        </div>

        {/* Big progression bar */}
        <div className="w-full md:w-80 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-dream-muted uppercase tracking-wider">Completion Index</span>
            <span className="text-dream-teal font-bold">{progressPercent}%</span>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-dream-purple via-dream-blue to-dream-teal rounded-full shadow-neon-teal transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {achievements.map((badge) => {
          return (
            <div 
              key={badge.id} 
              className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                badge.unlocked 
                  ? `${getBadgeCategoryGlow(badge.category)} bg-white/3 hover:-translate-y-1`
                  : 'border-white/5 bg-white/1 opacity-60'
              }`}
            >
              {/* Background gradient glares */}
              {badge.unlocked && (
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-dream-purple/5 blur-xl pointer-events-none" />
              )}

              {/* Badge Headers */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                    badge.unlocked 
                      ? 'border-dream-teal/30 bg-dream-teal/5 text-dream-teal' 
                      : 'border-white/5 bg-white/5 text-dream-muted'
                  }`}>
                    {badge.category}
                  </span>
                  
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center border ${
                    badge.unlocked 
                      ? 'bg-dream-teal/10 border-dream-teal/20 text-dream-teal shadow-glass-glow' 
                      : 'bg-white/5 border-white/5 text-dream-muted'
                  }`}>
                    {badge.unlocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  </div>
                </div>

                <h4 className="font-bold text-base text-white font-display mb-1.5 leading-tight">{badge.name}</h4>
                <p className="text-xs text-dream-muted leading-relaxed mb-4">{badge.description}</p>
              </div>

              {/* Badge Progress Stats */}
              <div className="space-y-1.5 pt-4 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-semibold text-dream-muted">
                  <span>Progress</span>
                  <span className={badge.unlocked ? 'text-dream-teal font-bold' : ''}>{badge.progressText}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full rounded-full ${
                      badge.unlocked 
                        ? 'bg-gradient-to-r from-dream-purple to-dream-teal' 
                        : 'bg-white/10'
                    }`}
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
