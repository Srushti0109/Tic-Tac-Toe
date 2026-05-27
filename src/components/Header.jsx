import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Volume2, VolumeX } from 'lucide-react';

const Header = () => {
  const { theme, setTheme, themes, soundEnabled, toggleSound } = useTheme();

  return (
    <header className="w-full flex justify-between items-center p-4 sm:p-6 absolute top-0 left-0 z-50">
      <div className="text-xl sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-md cursor-default">
        TIC<span className="text-text">TAC</span>TOE
      </div>
      
      <div className="flex gap-2 sm:gap-4 items-center">
        <select 
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-board text-text text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-white/10 outline-none cursor-pointer focus:border-primary/50 backdrop-blur-md shadow-sm"
        >
          {themes.map(t => (
            <option key={t.id} value={t.id} className="bg-background text-text">{t.name}</option>
          ))}
        </select>
        
        <button 
          onClick={toggleSound}
          className="p-2 rounded-full hover:bg-board transition-colors text-text/80 hover:text-text backdrop-blur-md"
          title={soundEnabled ? "Mute sound" : "Enable sound"}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
