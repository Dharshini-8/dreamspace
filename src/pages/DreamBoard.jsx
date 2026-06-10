import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Image, 
  PlusCircle, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function DreamBoard() {
  const { goals, addGoal, updateGoal, deleteGoal } = useApp();
  const [showAddGoal, setShowAddGoal] = useState(false);
  
  // Goal Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Skill');
  const [targetDate, setTargetDate] = useState('');

  // Default pre-generated assets for the board
  const [visionCards, setVisionCards] = useState([
    {
      id: 'vision-1',
      title: 'Cosmic Whale Wisdom',
      description: 'A symbol of emotional alignment and deeper spiritual guidance from the oceanic depths.',
      imageUrl: '/visions/cosmic_whale.png',
      category: 'Healing'
    },
    {
      id: 'vision-2',
      title: 'Cyber City Navigation',
      description: 'Building structure and exploring future milestones in my professional and personal life.',
      imageUrl: '/visions/cyber_city.png',
      category: 'Lucid'
    },
    {
      id: 'vision-3',
      title: 'Labyrinth Dissolution',
      description: 'Understanding the anxieties that form glass mazes, learning to walk through fear panels.',
      imageUrl: '/visions/glass_maze.png',
      category: 'Psychological'
    }
  ]);

  const [showAddVision, setShowAddVision] = useState(false);
  const [visionTitle, setVisionTitle] = useState('');
  const [visionDesc, setVisionDesc] = useState('');
  const [visionImgUrl, setVisionImgUrl] = useState('');

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!title) return;
    await addGoal({
      title,
      description,
      category,
      targetDate,
      progress: 0,
      completed: false
    });
    setTitle('');
    setDescription('');
    setCategory('Skill');
    setTargetDate('');
    setShowAddGoal(false);
  };

  const handleToggleGoal = async (goal) => {
    const nextCompleted = !goal.completed;
    await updateGoal(goal.id, {
      completed: nextCompleted,
      progress: nextCompleted ? 100 : 0
    });
  };

  const handleAddVisionCard = (e) => {
    e.preventDefault();
    if (!visionTitle || !visionImgUrl) return;
    const newCard = {
      id: 'vision-' + Math.random().toString(36).substr(2, 9),
      title: visionTitle,
      description: visionDesc,
      imageUrl: visionImgUrl,
      category: 'Custom'
    };
    setVisionCards(prev => [newCard, ...prev]);
    setVisionTitle('');
    setVisionDesc('');
    setVisionImgUrl('');
    setShowAddVision(false);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      
      {/* Header Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-dream-text">
            DREAM BOARD
          </h2>
          <p className="text-xs md:text-sm text-dream-muted">
            Map subconscious goals and anchors to align your conscious desires.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Columns (Col Span 2): Vision Board Gallery */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display flex items-center gap-2">
              <Image className="h-5 w-5 text-dream-teal" />
              <span>VISION GLYPHS</span>
            </h3>
            <button
              onClick={() => setShowAddVision(true)}
              className="btn-neon-border text-xs px-3.5 py-1.5 flex items-center gap-1 border-dream-teal/30 hover:border-dream-teal text-dream-teal hover:bg-dream-teal/10"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Vision Anchor</span>
            </button>
          </div>

          {/* Vision Anchor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visionCards.map((card) => (
              <div 
                key={card.id} 
                className="glass-panel group rounded-3xl overflow-hidden border border-white/5 bg-white/2 hover:border-dream-purple/30 transition-all duration-300 relative shadow-glass"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110c1c] via-[#110c1c]/20 to-transparent z-10 pointer-events-none" />
                  <img 
                    src={card.imageUrl} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-bold text-dream-teal tracking-wider uppercase z-20">
                    {card.category}
                  </span>
                </div>
                <div className="p-5 relative -mt-3 z-20">
                  <h4 className="font-bold text-base text-white font-display mb-1">{card.title}</h4>
                  <p className="text-xs text-dream-muted leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Col Span 1): Subconscious Goals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-dream-purple" />
              <span>SUBCONSCIOUS GOALS</span>
            </h3>
            <button
              onClick={() => setShowAddGoal(true)}
              className="h-8 w-8 rounded-lg bg-dream-purple/20 border border-dream-purple/30 flex items-center justify-center text-dream-purple hover:bg-dream-purple hover:text-white transition-all duration-300"
            >
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-white/5 bg-white/2 space-y-4">
            {goals.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-dream-muted mx-auto mb-2 opacity-50" />
                <p className="text-xs text-dream-muted italic">No goals defined yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div 
                    key={goal.id} 
                    className={`flex items-start justify-between gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                      goal.completed 
                        ? 'bg-dream-teal/5 border-dream-teal/20 text-dream-muted' 
                        : 'bg-white/5 border-white/5 text-white'
                    }`}
                  >
                    <button 
                      onClick={() => handleToggleGoal(goal)}
                      className="mt-0.5 text-dream-muted hover:text-dream-teal transition-colors duration-200 flex-shrink-0"
                    >
                      {goal.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-dream-teal" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                    
                    <div className="flex-1 text-left min-w-0">
                      <h4 className={`text-xs font-bold font-display truncate ${goal.completed ? 'line-through opacity-60' : ''}`}>
                        {goal.title}
                      </h4>
                      <p className={`text-[10px] text-dream-muted leading-tight mt-0.5 ${goal.completed ? 'opacity-50' : ''}`}>
                        {goal.description}
                      </p>
                      {goal.targetDate && (
                        <span className="flex items-center gap-1 text-[9px] text-dream-purple font-semibold mt-1.5">
                          <Calendar className="h-3 w-3" />
                          {goal.targetDate}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-dream-muted hover:text-dream-pink p-1 rounded-lg hover:bg-white/5 transition-all duration-300 flex-shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel max-w-sm w-full rounded-3xl p-6 relative animate-float">
            <h3 className="text-base font-bold font-display text-white mb-4">NEW SUBCONSCIOUS GOAL</h3>
            <form onSubmit={handleAddGoal} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Goal Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Induce Lucidity at Will"
                  className="w-full glass-input text-xs py-2"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Target Statement</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your subconscious target"
                  rows={2}
                  className="w-full glass-input text-xs py-2 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full glass-input text-xs py-2 bg-[#110c1c]"
                  >
                    <option value="Skill">Skill</option>
                    <option value="Integration">Integration</option>
                    <option value="Habit">Habit</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Target Date</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full glass-input text-xs py-2"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 btn-neon-border text-[10px] py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-neon-purple text-[10px] py-2"
                >
                  Create Anchor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Vision Anchor Modal */}
      {showAddVision && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-panel max-w-sm w-full rounded-3xl p-6 relative animate-float">
            <h3 className="text-base font-bold font-display text-white mb-4">NEW VISION ANCHOR</h3>
            <form onSubmit={handleAddVisionCard} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Anchor Title</label>
                <input
                  type="text"
                  required
                  value={visionTitle}
                  onChange={(e) => setVisionTitle(e.target.value)}
                  placeholder="E.g., Astral Path"
                  className="w-full glass-input text-xs py-2"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Symbolic Meaning</label>
                <textarea
                  value={visionDesc}
                  onChange={(e) => setVisionDesc(e.target.value)}
                  placeholder="Describe its personal/subconscious meaning"
                  rows={2}
                  className="w-full glass-input text-xs py-2 resize-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-dream-muted uppercase tracking-wider block mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={visionImgUrl}
                  onChange={(e) => setVisionImgUrl(e.target.value)}
                  placeholder="Paste image link (e.g. Unsplash URL)"
                  className="w-full glass-input text-xs py-2"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddVision(false)}
                  className="flex-1 btn-neon-border text-[10px] py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-neon-purple text-[10px] py-2"
                >
                  Pin Anchor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
