import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Trash2, 
  Moon, 
  Calendar,
  AlertCircle,
  Check,
  Filter,
  Brain
} from 'lucide-react';

export default function VisionJournal() {
  const { dreams, addDream, deleteDream } = useApp();
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Lucid');
  const [emotion, setEmotion] = useState('Peaceful');
  const [emotionScore, setEmotionScore] = useState(70);
  const [sleepQuality, setSleepQuality] = useState(70);
  const [lucid, setLucid] = useState(true);
  const [symbolsText, setSymbolsText] = useState('');
  const [logSuccess, setLogSuccess] = useState(false);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterEmotion, setFilterEmotion] = useState('All');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    // Parse comma-separated symbols
    const symbols = symbolsText
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(s => s !== '');

    await addDream({
      title,
      description,
      date,
      category,
      emotion,
      emotionScore: Number(emotionScore),
      sleepQuality: Number(sleepQuality),
      lucid,
      symbols
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('Lucid');
    setEmotion('Peaceful');
    setEmotionScore(70);
    setSleepQuality(70);
    setLucid(true);
    setSymbolsText('');
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 2000);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Lucid': return 'text-dream-teal border-dream-teal/30 bg-dream-teal/5';
      case 'Nightmare': return 'text-dream-pink border-dream-pink/30 bg-dream-pink/5';
      case 'Healing': return 'text-dream-purple border-dream-purple/30 bg-dream-purple/5';
      default: return 'text-dream-blue border-dream-blue/30 bg-dream-blue/5';
    }
  };

  // Filter Logic
  const filteredDreams = dreams.filter(dream => {
    const matchesSearch = 
      dream.title.toLowerCase().includes(search.toLowerCase()) ||
      dream.description.toLowerCase().includes(search.toLowerCase()) ||
      dream.symbols.some(s => s.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = filterCategory === 'All' || dream.category === filterCategory;
    const matchesEmotion = filterEmotion === 'All' || dream.emotion === filterEmotion;

    return matchesSearch && matchesCategory && matchesEmotion;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6 text-left">
      
      {/* Header Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-dream-text">
            VISION JOURNAL
          </h2>
          <p className="text-xs md:text-sm text-dream-muted">
            Transcribe and index details from your subconscious logs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        
        {/* Left Columns (Col Span 2): Form entry */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-base font-bold font-display flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-dream-teal" />
            <span>TRANSCRIBE DREAM</span>
          </h3>

          <div className="glass-panel rounded-3xl p-6 border border-white/5 bg-gradient-to-b from-[#110c1c] to-[#07050d] relative shadow-glass">
            
            {logSuccess && (
              <div className="absolute inset-0 bg-[#07050d]/95 rounded-3xl flex flex-col items-center justify-center text-dream-teal font-semibold gap-2 z-30 animate-pulse">
                <Check className="h-10 w-10 p-2 rounded-full border border-dream-teal bg-dream-teal/10 shadow-glass-glow" />
                <span>Subconscious Logs Saved!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Dream Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Starry oceans and glowing whales"
                  className="w-full glass-input text-xs py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Date Logged</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full glass-input text-xs py-2.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full glass-input text-xs py-2.5 bg-[#110c1c]"
                  >
                    <option value="Lucid">Lucid</option>
                    <option value="Nightmare">Nightmare</option>
                    <option value="Healing">Healing</option>
                    <option value="Recurring">Recurring</option>
                    <option value="Prophetic">Prophetic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Dream Transcript</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail what happened. Write whatever you remember immediately..."
                  rows={4}
                  className="w-full glass-input text-xs py-2.5 resize-none leading-relaxed"
                />
              </div>

              {/* Sliders for statistics */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-dream-muted uppercase tracking-wider mb-1">
                    <span>Sleep Quality</span>
                    <span className="text-dream-blue font-bold">{sleepQuality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(e.target.value)}
                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-dream-blue"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-dream-muted uppercase tracking-wider mb-1">
                    <span>Emotional Intensity</span>
                    <span className="text-dream-pink font-bold">{emotionScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={emotionScore}
                    onChange={(e) => setEmotionScore(e.target.value)}
                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-dream-pink"
                  />
                </div>
              </div>

              {/* Emotion choice and tags */}
              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Dominant Emotion</label>
                  <select
                    value={emotion}
                    onChange={(e) => setEmotion(e.target.value)}
                    className="w-full glass-input text-xs py-2.5 bg-[#110c1c]"
                  >
                    <option value="Peaceful">Peaceful</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Inspired">Inspired</option>
                    <option value="Scared">Scared</option>
                    <option value="Confused">Confused</option>
                    <option value="Excited">Excited</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pb-2 bg-white/3 border border-white/5 rounded-xl px-3 h-10">
                  <span className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider">Lucidity Control</span>
                  <input
                    type="checkbox"
                    checked={lucid}
                    onChange={(e) => setLucid(e.target.checked)}
                    className="w-4 h-4 rounded border-white/10 accent-dream-teal cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">
                  Symbols (Comma Separated)
                </label>
                <input
                  type="text"
                  value={symbolsText}
                  onChange={(e) => setSymbolsText(e.target.value)}
                  placeholder="E.g., whale, water, stars, falling"
                  className="w-full glass-input text-xs py-2.5"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-neon-purple text-xs py-2.5 flex items-center justify-center gap-2"
              >
                <Brain className="h-4.5 w-4.5" />
                <span>Log to Subconscious Archive</span>
              </button>

            </form>
          </div>
        </div>

        {/* Right Columns (Col Span 3): Journal list & search filter */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-base font-bold font-display flex items-center gap-2">
            <Filter className="h-5 w-5 text-dream-purple" />
            <span>ARCHIVE FEED ({filteredDreams.length})</span>
          </h3>

          {/* Search and Filter Inputs */}
          <div className="glass-panel rounded-3xl p-5 border border-white/5 bg-white/2 space-y-3 shadow-sm">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transcripts, titles, or tags..."
                className="w-full glass-input text-xs pl-10 pr-4 py-2.5"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-dream-muted" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Filter Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full glass-input text-xs py-2 bg-[#110c1c]"
                >
                  <option value="All">All Categories</option>
                  <option value="Lucid">Lucid</option>
                  <option value="Nightmare">Nightmare</option>
                  <option value="Healing">Healing</option>
                  <option value="Recurring">Recurring</option>
                  <option value="Prophetic">Prophetic</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Filter Emotion</label>
                <select
                  value={filterEmotion}
                  onChange={(e) => setFilterEmotion(e.target.value)}
                  className="w-full glass-input text-xs py-2 bg-[#110c1c]"
                >
                  <option value="All">All Emotions</option>
                  <option value="Peaceful">Peaceful</option>
                  <option value="Anxious">Anxious</option>
                  <option value="Inspired">Inspired</option>
                  <option value="Scared">Scared</option>
                  <option value="Confused">Confused</option>
                  <option value="Excited">Excited</option>
                </select>
              </div>
            </div>
          </div>

          {/* Entries Feed Grid */}
          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {filteredDreams.length === 0 ? (
              <div className="glass-panel rounded-2xl p-8 border border-white/5 bg-white/2 text-center">
                <AlertCircle className="h-8 w-8 text-dream-muted mx-auto mb-2 opacity-50" />
                <p className="text-sm text-dream-muted italic">No matching journal entries found.</p>
              </div>
            ) : (
              filteredDreams.map((dream) => (
                <div 
                  key={dream.id} 
                  className="glass-panel rounded-2xl p-5 border border-white/5 bg-white/2 space-y-3 transition-all duration-300 hover:border-white/10"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[9px] font-bold text-dream-muted uppercase">
                          <Calendar className="h-3.5 w-3.5" />
                          {dream.date}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border uppercase ${getCategoryColor(dream.category)}`}>
                          {dream.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-white font-display mt-1.5 leading-tight">{dream.title}</h4>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm("Permanently erase this dream entry?")) {
                          deleteDream(dream.id);
                        }
                      }}
                      className="text-dream-muted hover:text-dream-pink p-1 rounded-lg hover:bg-white/5 transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-dream-text/90 leading-relaxed max-h-24 overflow-y-auto bg-black/10 rounded-lg p-2.5 border border-white/5">
                    {dream.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1">
                      {dream.symbols.map((sym, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] text-dream-muted">
                          #{sym}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-dream-muted font-semibold">
                      <span>Sleep: <strong className="text-dream-blue">{dream.sleepQuality}%</strong></span>
                      <span>Emotion: <strong className="text-dream-pink">{dream.emotionScore}%</strong></span>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
