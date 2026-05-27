import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ThemeBackgrounds from './components/ThemeBackgrounds';
import LandingPage from './pages/LandingPage';
import GameScreen from './pages/GameScreen';

const GameApp = () => {
  const { gameMode } = useGame();

  return (
    <div className="relative h-screen flex flex-col w-full overflow-hidden selection:bg-primary/30">
      <ThemeBackgrounds />
      <Header />
      
      <main className="flex-grow flex items-center justify-center relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {!gameMode ? (
            <LandingPage key="landing" />
          ) : (
            <GameScreen key="game" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <GameProvider>
        <GameApp />
      </GameProvider>
    </ThemeProvider>
  );
};

export default App;
