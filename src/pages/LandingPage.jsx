import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { User, Users, Play, Brain, Sparkles, ChevronDown, Network, Zap } from 'lucide-react';
import clsx from 'clsx';

const LandingPage = () => {
  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar overflow-x-hidden pt-20">
      <HeroSection />
      <FeaturesSection />
      <HowAIWorksSection />
      
      <footer className="w-full py-8 text-center text-text/40 text-xs border-t border-white/5 mt-20 z-10 relative">
        <p>Premium Tic-Tac-Toe • Built with React & Framer Motion</p>
      </footer>
    </div>
  );
};

const HeroSection = () => {
  const { setGameMode, difficulty, setDifficulty } = useGame();
  const [selectedMode, setSelectedMode] = useState('1p');

  const handleStart = () => {
    setGameMode(selectedMode);
  };

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 relative z-10 w-full max-w-7xl mx-auto pb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Title & Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
            <Sparkles size={14} /> THE ULTIMATE SHOWCASE
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6 text-glow-primary bg-clip-text text-transparent bg-gradient-to-br from-text via-primary to-accent py-2">
            NEVER <br/> LOSE <br/> AGAIN.
          </h1>
          <p className="text-text/60 text-lg sm:text-xl max-w-md mb-8 leading-relaxed">
            Experience Tic-Tac-Toe redefined. Powered by an unbeatable Minimax algorithm, immersive dynamic themes, and hyper-smooth animations.
          </p>
        </motion.div>

        {/* Right: Game Setup Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="glass-panel p-6 sm:p-8 w-full max-w-md mx-auto shadow-2xl flex flex-col gap-6 sm:gap-8"
        >
          {/* Game Mode Selection */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-text/50 mb-3 ml-1">Select Mode</h2>
            <div className="grid grid-cols-2 gap-3">
              <ModeButton 
                active={selectedMode === '1p'} 
                onClick={() => setSelectedMode('1p')}
                icon={<User size={20} />}
                title="1 Player"
                subtitle="vs AI"
              />
              <ModeButton 
                active={selectedMode === '2p'} 
                onClick={() => setSelectedMode('2p')}
                icon={<Users size={20} />}
                title="2 Players"
                subtitle="Local"
              />
            </div>
          </div>

          {/* Difficulty Selection */}
          {selectedMode === '1p' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-text/50 mb-3 ml-1">AI Difficulty</h2>
              <div className="grid grid-cols-3 gap-2">
                <DifficultyButton 
                  active={difficulty === 'easy'} 
                  onClick={() => setDifficulty('easy')}
                  label="Easy"
                  color="hover:border-green-500/50 hover:text-green-400"
                  activeColor="border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                />
                <DifficultyButton 
                  active={difficulty === 'medium'} 
                  onClick={() => setDifficulty('medium')}
                  label="Medium"
                  color="hover:border-blue-500/50 hover:text-blue-400"
                  activeColor="border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                />
                <DifficultyButton 
                  active={difficulty === 'hard'} 
                  onClick={() => setDifficulty('hard')}
                  label="Hard"
                  color="hover:border-red-500/50 hover:text-red-400"
                  activeColor="border-red-500 text-red-400 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                />
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="w-full py-4 mt-2 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-bold text-lg shadow-glow flex items-center justify-center gap-2 transition-all hover:opacity-90"
          >
            <Play size={20} fill="currentColor" />
            START GAME
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-text/30"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const FeaturesSection = () => (
  <section className="py-20 px-4 max-w-7xl mx-auto w-full z-10 relative">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-black mb-4">Premium Features</h2>
      <p className="text-text/50 max-w-xl mx-auto">Designed to push the limits of what a simple web game can be, featuring state-of-the-art frontend technologies.</p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-6">
      <FeatureCard 
        icon={<Brain className="text-primary" size={32} />}
        title="Unbeatable AI"
        desc="Powered by a highly optimized Minimax algorithm with Alpha-Beta pruning. It evaluates every possible future before you even click."
      />
      <FeatureCard 
        icon={<Sparkles className="text-secondary" size={32} />}
        title="Dynamic Theming"
        desc="Switch instantly between 5 immersive themes. From neon cyberpunk grids to parallax space stars, rendered entirely with CSS & Framer Motion."
      />
      <FeatureCard 
        icon={<Zap className="text-accent" size={32} />}
        title="Smooth 60FPS"
        desc="Built with React 18 and highly optimized SVG animations to ensure buttery smooth micro-interactions and transitions on any device."
      />
    </div>
  </section>
);

const HowAIWorksSection = () => (
  <section className="py-20 px-4 max-w-5xl mx-auto w-full z-10 relative">
    <div className="glass-panel p-8 sm:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text/70 text-xs font-bold mb-6">
            <Network size={14} /> DEEP DIVE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-6">How the AI Works</h2>
          <p className="text-text/70 leading-relaxed mb-6">
            In "Hard" mode, the AI uses the <strong>Minimax Algorithm</strong>. It creates a massive decision tree, simulating every single possible move until the game ends in a win, loss, or draw.
          </p>
          <p className="text-text/70 leading-relaxed mb-8">
            To ensure the game runs instantly, it uses <strong>Alpha-Beta Pruning</strong>—a mathematical optimization that stops evaluating bad moves early, drastically reducing processing time.
          </p>
          <div className="p-4 bg-board rounded-xl border border-white/5 shadow-inner">
            <p className="text-sm font-mono text-primary font-bold">Conclusion:</p>
            <p className="text-xs text-text/60 mt-1">Tic-Tac-Toe is a solved game. The AI knows the future. You cannot win.</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center">
           {/* Visual Representation of a node tree */}
           <div className="flex flex-col items-center gap-4">
             <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold shadow-[0_0_15px_var(--primary)] bg-background/50 backdrop-blur-sm">+10</div>
             <div className="flex gap-16">
                <div className="w-px h-8 bg-white/20 transform rotate-45 translate-x-4" />
                <div className="w-px h-8 bg-white/20 transform -rotate-45 -translate-x-4" />
             </div>
             <div className="flex gap-12">
                <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center text-secondary font-bold opacity-60 bg-background/50">-10</div>
                <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white/50 font-bold opacity-60 bg-background/50">0</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const ModeButton = ({ active, onClick, icon, title, subtitle }) => (
  <button
    onClick={onClick}
    className={clsx(
      'p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300',
      active 
        ? 'border-primary bg-primary/10 text-primary shadow-glow' 
        : 'border-glass-border bg-board text-text/60 hover:bg-white/5 hover:text-text'
    )}
  >
    {icon}
    <div className="text-center">
      <div className="font-bold text-sm">{title}</div>
      <div className="text-[10px] opacity-70">{subtitle}</div>
    </div>
  </button>
);

const DifficultyButton = ({ active, onClick, label, color, activeColor }) => (
  <button
    onClick={onClick}
    className={clsx(
      'py-2 px-1 rounded-lg text-sm font-bold border transition-all duration-300',
      active ? activeColor : `border-glass-border bg-board text-text/60 ${color}`
    )}
  >
    {label}
  </button>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-6 sm:p-8 hover:border-white/20 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-full bg-board border border-white/5 flex items-center justify-center mb-6 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-text/60 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default LandingPage;
