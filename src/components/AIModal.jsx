import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Network, BrainCircuit, Activity } from 'lucide-react';

const AIModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-[5%] sm:top-[10%] left-1/2 transform -translate-x-1/2 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto glass-panel z-[101] p-0 shadow-2xl custom-scrollbar"
          >
            <div className="sticky top-0 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 sm:p-6 flex justify-between items-center z-10">
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 text-glow-primary">
                <BrainCircuit className="text-primary" /> Inside the AI Mind
              </h2>
              <button 
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 sm:p-8 space-y-8">
              <Section 
                title="The Minimax Algorithm" 
                icon={<Network className="text-secondary" />}
              >
                <p className="text-sm text-text/80 leading-relaxed mb-4">
                  The AI in "Hard" mode uses the <strong>Minimax</strong> algorithm. It's a recursive algorithm used in decision-making and game theory. Minimax provides an optimal move for the player assuming that the opponent is also playing optimally.
                </p>
                <div className="bg-board p-4 rounded-xl border border-white/5 font-mono text-xs text-text/70 shadow-inner">
                  <span className="text-primary font-bold">Maximizer (AI)</span> tries to get the highest score (+10)<br/>
                  <span className="text-secondary font-bold">Minimizer (You)</span> tries to get the lowest score (-10)<br/>
                  <br/>
                  The AI explores <em>every possible future board state</em> to the end of the game before making a single move.
                </div>
              </Section>

              <Section 
                title="Alpha-Beta Pruning" 
                icon={<Activity className="text-accent" />}
              >
                <p className="text-sm text-text/80 leading-relaxed">
                  Exploring hundreds of thousands of board states is computationally expensive. We optimize the Minimax algorithm using <strong>Alpha-Beta Pruning</strong>.
                </p>
                <p className="text-sm text-text/80 leading-relaxed mt-2">
                  This optimization stops evaluating a branch of the game tree as soon as it determines that the branch cannot possibly influence the final decision. It dramatically speeds up the AI, allowing it to respond instantly without dropping frames.
                </p>
              </Section>

              <Section title="Why is it unbeatable?">
                <p className="text-sm text-text/80 leading-relaxed bg-primary/10 border border-primary/20 p-4 rounded-xl">
                  Because Tic-Tac-Toe is a solved game (a game whose outcome can be correctly predicted from any position), an algorithm that can look ahead to the end of the game will never make a mistake. At best, if you play perfectly, you can force a <strong>Draw</strong>.
                </p>
              </Section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Section = ({ title, icon, children }) => (
  <div>
    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
      {icon} {title}
    </h3>
    {children}
  </div>
);

export default AIModal;
