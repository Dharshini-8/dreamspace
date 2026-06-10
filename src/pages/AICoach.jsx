import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Sparkles, Brain, MessageSquare, Bot, ArrowRight, User } from 'lucide-react';

export default function AICoach() {
  const { chatHistory, saveChats, user } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from AppContext
  useEffect(() => {
    if (chatHistory && chatHistory.length > 0) {
      setMessages(chatHistory);
    } else {
      // Default welcome messages if empty
      setMessages([
        {
          id: 'welcome-1',
          sender: 'coach',
          text: `Greetings, ${user?.displayName || 'Dreamer'}. I am Morpheus, your AI Dream Coach. I am here to help you translate the cryptic messages of your subconscious mind.`,
          timestamp: new Date().toISOString()
        },
        {
          id: 'welcome-2',
          sender: 'coach',
          text: `Describe a recent dream, tell me about recurring symbols, or select one of the core templates below to begin our translation.`,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [chatHistory, user]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetPrompts = [
    { label: 'Interpret: Flying', query: 'What does flying in a dream signify?' },
    { label: 'Interpret: Glass Maze', query: 'What is the meaning of being trapped in a maze made of glass panels?' },
    { label: 'Interpret: Starry Whale', query: 'What is the spiritual meaning of a constellation whale?' },
    { label: 'Interpret: Falling Clock', query: 'Why did I see a key inside a clock tower while falling?' }
  ];

  // Custom local client response engine matching key symbolic prompts
  const getCoachResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('fly') || q.includes('flying')) {
      return "Flying is the ultimate symbol of control, liberation, and clarity. It indicates that you are rising above a challenging situation in your waking life or seeking a broader perspective. If you were flying with ease, it shows self-confidence. If you struggled, it suggests that something is holding you back from fully claiming your freedom.";
    }
    if (q.includes('maze') || q.includes('labyrinth') || q.includes('glass')) {
      return "Mazes represent cognitive confusion or feeling trapped by life decisions. A labyrinth made of glass is particularly striking—it suggests that while the solutions or outer world are visible, you feel barred by unseen boundaries. It asks you to reflect on where in your waking life you feel you can see the path but cannot physically navigate to it.";
    }
    if (q.includes('whale') || q.includes('constellation') || q.includes('ocean')) {
      return "Swimming comfortably in the ocean shows harmony with your subconscious ocean. The starry whale represents ancient, cosmic wisdom. It indicates that your deeper mind is ready to offer guidance. The message of letting go of patterns suggests that you are over-thinking a challenge. Intuition, not logic, will reveal the path.";
    }
    if (q.includes('key') || q.includes('clock') || q.includes('fall') || q.includes('falling')) {
      return "Falling is a manifestation of losing grip, insecurity, or a fear of failing in your current tasks. The key inside the clock tower is a powerful resolution symbol. It signifies that time itself holds the answer, or that resolving a timing barrier in your waking life is the exact 'key' you need to regain control and halt the fall.";
    }
    if (q.includes('chased') || q.includes('shadow')) {
      return "Being chased indicates avoidance. The shadow represents your unintegrated emotions or fears that you are trying to outrun. Rather than running, the coach suggests writing down the shadow's characteristics in your Vision Journal to integrate and neutralize its fear.";
    }

    return "A fascinating dream. The symbols present indicate a period of transition in your subconscious. Dreams serve as emotional stabilizers, compiling your waking memories and restructuring them. I recommend documenting the sensory details (colors, temperatures, and exact dialogue) in your journal. Which aspect of this dream felt the most emotionally charged to you?";
  };

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: 'msg-' + Math.random().toString(36).substr(2, 9),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput('');
    setIsTyping(true);

    // Simulate coach analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const coachReply = {
      id: 'msg-' + Math.random().toString(36).substr(2, 9),
      sender: 'coach',
      text: getCoachResponse(textToSend),
      timestamp: new Date().toISOString()
    };

    const finalHistory = [...updatedHistory, coachReply];
    setMessages(finalHistory);
    setIsTyping(false);
    
    // Persist chats in AppContext/LocalStorage
    await saveChats(finalHistory);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 text-left">
      
      {/* Header Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-dream-text">
            AI DREAM COACH
          </h2>
          <p className="text-xs md:text-sm text-dream-muted">
            Interpret your dream patterns with Morpheus, your cognitive guide.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        
        {/* Left Column (Col Span 1): Coach Details and Presets */}
        <div className="md:col-span-1 flex flex-col justify-between glass-panel rounded-3xl p-5 border border-white/5 bg-white/2">
          
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-white/5">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-tr from-dream-purple to-dream-teal flex items-center justify-center text-white shadow-glass-glow mb-3 animate-float-slow">
                <Brain className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-base text-white font-display">Morpheus v1.0</h4>
              <span className="text-[10px] text-dream-teal font-extrabold tracking-widest uppercase">Psychological Guide</span>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-dream-muted uppercase tracking-wider">Quick Analysis</h5>
              <div className="flex flex-col gap-1.5">
                {presetPrompts.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(preset.query)}
                    className="w-full text-left p-2 rounded-xl bg-white/3 border border-white/5 hover:border-dream-purple/30 hover:bg-dream-purple/5 text-[11px] text-dream-text/90 transition-all duration-300 flex items-center justify-between group"
                  >
                    <span>{preset.label}</span>
                    <ArrowRight className="h-3 w-3 text-dream-muted group-hover:text-dream-teal group-hover:translate-x-0.5 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-[10px] text-dream-muted leading-relaxed">
            Morpheus evaluates archetypal patterns, Jungian symbols, and sleep states to help clarify subconscious narratives.
          </div>
        </div>

        {/* Right Columns (Col Span 3): Chat Interface */}
        <div className="md:col-span-3 flex flex-col justify-between glass-panel rounded-3xl border border-white/5 bg-gradient-to-b from-[#110c1c] to-[#07050d] h-[550px] shadow-glass">
          
          {/* Chat Headers */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-dream-purple/15 border border-dream-purple/35 flex items-center justify-center text-dream-teal">
                <Bot className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Translation Chamber</h4>
                <span className="text-[9px] text-dream-teal font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-dream-teal animate-ping" />
                  Active Uplink
                </span>
              </div>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((msg) => {
              const isCoach = msg.sender === 'coach';
              return (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-3 max-w-[85%] ${isCoach ? 'mr-auto text-left' : 'ml-auto flex-row-reverse text-right'}`}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isCoach 
                      ? 'bg-dream-purple/10 border border-dream-purple/30 text-dream-teal' 
                      : 'bg-dream-blue/10 border border-dream-blue/30 text-dream-pink'
                  }`}>
                    {isCoach ? <Bot className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
                  </div>

                  <div className={`rounded-2xl p-4 text-xs leading-relaxed border shadow-md ${
                    isCoach 
                      ? 'bg-white/3 border-white/5 text-dream-text/90 rounded-tl-none' 
                      : 'bg-dream-purple/20 border-dream-purple/35 text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3 mr-auto max-w-[85%] text-left">
                <div className="h-8 w-8 rounded-lg bg-dream-purple/10 border border-dream-purple/30 text-dream-teal flex items-center justify-center">
                  <Bot className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div className="bg-white/3 border border-white/5 rounded-2xl rounded-tl-none p-4 text-xs text-dream-muted flex items-center gap-1.5 shadow-md">
                  <span>Translating subconscious</span>
                  <span className="flex gap-0.5">
                    <span className="h-1 w-1 bg-dream-teal rounded-full animate-bounce" />
                    <span className="h-1 w-1 bg-dream-teal rounded-full animate-bounce delay-75" />
                    <span className="h-1 w-1 bg-dream-teal rounded-full animate-bounce delay-150" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Field */}
          <div className="px-6 py-4 border-t border-white/5">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Morpheus to translate symbols or analyze a dream..."
                className="flex-1 glass-input text-xs py-2.5"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="btn-neon-purple px-4 flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
