import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  ChevronRight, 
  Trash2, 
  BrainCircuit, 
  Smile, 
  Sparkles,
  Info,
  Clock
} from 'lucide-react';

export default function DreamTimeline({ selectedDreamId, setSelectedDreamId }) {
  const { dreams, deleteDream } = useApp();
  const [activeDream, setActiveDream] = useState(null);

  // Focus dream if selected from another page (like Dashboard)
  useEffect(() => {
    if (selectedDreamId) {
      const match = dreams.find(d => d.id === selectedDreamId);
      if (match) {
        setActiveDream(match);
      }
    }
  }, [selectedDreamId, dreams]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to permanently erase this dream from your subconscious archive?")) {
      await deleteDream(id);
      setActiveDream(null);
      setSelectedDreamId(null);
    }
  };

  const getEmotionEmoji = (emotion) => {
    switch (emotion) {
      case 'Peaceful': return '😌';
      case 'Anxious': return '😰';
      case 'Inspired': return '✨';
      case 'Scared': return '😱';
      case 'Confused': return '🌀';
      default: return '💭';
    }
  };

  const getTimelineColor = (category) => {
    switch (category) {
      case 'Lucid': return 'border-dream-teal bg-dream-teal shadow-neon-teal';
      case 'Nightmare': return 'border-dream-pink bg-dream-pink shadow-neon-pink';
      case 'Healing': return 'border-dream-purple bg-dream-purple shadow-neon-purple';
      default: return 'border-dream-blue bg-dream-blue shadow-neon-blue';
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 text-left">
      
      {/* Header Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-dream-text">
            DREAM TIMELINE
          </h2>
          <p className="text-xs md:text-sm text-dream-muted">
            Journey chronologically through your subconscious archives.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Left Columns (Col Span 2): Chronological vertical path */}
        <div className="md:col-span-2 relative pl-8 border-l-2 border-white/5 space-y-8 py-2">
          
          {/* Neon timeline vertical glow effect */}
          <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-dream-purple via-dream-blue to-dream-teal opacity-50 blur-[2px]" />

          {dreams.length === 0 ? (
            <div className="glass-panel rounded-2xl p-8 border border-white/5 bg-white/2 text-center ml-[-12px]">
              <Clock className="h-10 w-10 text-dream-muted mx-auto mb-2 opacity-50" />
              <p className="text-sm text-dream-muted italic">No timeline milestones available.</p>
            </div>
          ) : (
            dreams.map((dream, index) => {
              const isActive = activeDream?.id === dream.id;
              return (
                <div key={dream.id} className="relative group">
                  
                  {/* Timeline Glowing Node */}
                  <div className={`absolute left-[-41px] top-1.5 h-6 w-6 rounded-full border-4 flex items-center justify-center transition-all duration-300 z-10 ${
                    isActive ? 'scale-125 ring-4 ring-white/10' : 'group-hover:scale-110'
                  } ${getTimelineColor(dream.category)}`} />

                  {/* Dream Card */}
                  <button
                    onClick={() => {
                      setActiveDream(dream);
                      setSelectedDreamId(dream.id);
                    }}
                    className={`w-full glass-panel rounded-2xl p-5 border text-left transition-all duration-300 ${
                      isActive 
                        ? 'border-dream-teal/40 bg-dream-teal/5 shadow-glass-glow -translate-x-1' 
                        : 'border-white/5 bg-white/2 hover:border-dream-purple/20 hover:-translate-x-1'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[10px] font-bold text-dream-muted uppercase">
                          <Calendar className="h-3.5 w-3.5" />
                          {dream.date}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                        <span className="text-[10px] text-dream-muted font-semibold uppercase">{dream.category}</span>
                      </div>
                      
                      {dream.lucid && (
                        <span className="self-start sm:self-auto rounded-full bg-dream-teal/10 border border-dream-teal/30 px-2 py-0.5 text-[8px] font-extrabold text-dream-teal uppercase tracking-widest shadow-inner">
                          Lucid Control
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white font-display mb-2 truncate">
                      {dream.title}
                    </h4>

                    <p className="text-xs text-dream-muted line-clamp-2 leading-relaxed">
                      {dream.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{getEmotionEmoji(dream.emotion)}</span>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{dream.emotion}</span>
                      </div>
                      <ChevronRight className={`h-4.5 w-4.5 text-dream-muted transition-transform duration-300 ${
                        isActive ? 'text-dream-teal translate-x-1' : 'group-hover:text-white group-hover:translate-x-0.5'
                      }`} />
                    </div>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column (Col Span 1): Dynamic Details Drawer */}
        <div className="md:sticky md:top-6 space-y-6">
          <h3 className="text-lg font-bold font-display flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-dream-purple" />
            <span>SUB-ANALYSIS</span>
          </h3>

          {!activeDream ? (
            <div className="glass-panel rounded-3xl p-6 border border-white/5 bg-white/2 text-center text-xs text-dream-muted italic">
              <Info className="h-6 w-6 mx-auto mb-2 opacity-40 text-dream-muted" />
              Select a dream milestone from the timeline to decode its symbols.
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 border border-dream-purple/20 bg-gradient-to-b from-[#161025] to-[#0b0816] space-y-5 shadow-glass animate-float relative overflow-hidden">
              
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-dream-purple/5 blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[9px] font-bold text-dream-muted uppercase block">{activeDream.date}</span>
                  <h4 className="font-bold text-lg text-white font-display leading-tight mt-1">
                    {activeDream.title}
                  </h4>
                </div>
                <button
                  onClick={() => handleDelete(activeDream.id)}
                  className="rounded-lg p-1.5 text-dream-muted hover:text-dream-pink hover:bg-white/5 transition-all duration-300"
                  title="Erase Entry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/3 border border-white/5 rounded-xl p-2.5 text-left">
                  <span className="text-[8px] font-bold text-dream-muted uppercase block tracking-wider">Sleep Quality</span>
                  <span className="text-base font-black font-display text-dream-blue">{activeDream.sleepQuality}%</span>
                </div>
                <div className="bg-white/3 border border-white/5 rounded-xl p-2.5 text-left">
                  <span className="text-[8px] font-bold text-dream-muted uppercase block tracking-wider">Emotion Level</span>
                  <span className="text-base font-black font-display text-dream-pink">{activeDream.emotionScore}%</span>
                </div>
              </div>

              {/* Dream description summary */}
              <div className="space-y-1.5 text-left">
                <h5 className="text-[10px] font-bold text-dream-muted uppercase tracking-wider">Subconscious Log</h5>
                <div className="bg-black/35 rounded-xl border border-white/5 p-3 text-xs leading-relaxed text-dream-text/90 max-h-36 overflow-y-auto">
                  {activeDream.description}
                </div>
              </div>

              {/* Symbols Parsed */}
              {activeDream.symbols && activeDream.symbols.length > 0 && (
                <div className="space-y-1.5 text-left">
                  <h5 className="text-[10px] font-bold text-dream-muted uppercase tracking-wider">Symbol Keys</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDream.symbols.map((symbol, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-dream-purple/10 border border-dream-purple/20 text-[9px] font-bold text-dream-teal uppercase tracking-wider">
                        #{symbol}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI interpretation */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-1.5 text-dream-teal">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <h5 className="text-[10px] font-bold uppercase tracking-wider">AI Translation</h5>
                </div>
                <div className="bg-gradient-to-br from-dream-purple/10 to-transparent rounded-xl border border-dream-purple/20 p-3 text-[11px] leading-relaxed text-dream-text/90 italic">
                  {activeDream.interpretation}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
