import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Trophy, Swords, Brain, Minus } from 'lucide-react';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) {
      setCount(end);
      return;
    }

    let totalMiliseconds = 1000;
    let incrementTime = (totalMiliseconds / (end || 1));
    if (incrementTime < 10) incrementTime = 10; // Cap frame rate

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
          setCount(end);
          clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const CircularProgress = ({ percentage, color, icon }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-16 h-16 mb-2">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-white/5"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={color}
          strokeLinecap="round"
        />
      </svg>
      <div className={`absolute ${color}`}>{icon}</div>
    </div>
  );
};

const Dashboard = () => {
  const { stats, gameMode } = useGame();

  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.playerXWins / stats.gamesPlayed) * 100) 
    : 0;
    
  const aiWinRate = stats.gamesPlayed > 0 
    ? Math.round((stats.aiWins / stats.gamesPlayed) * 100) 
    : 0;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-2"
    >
      <StatCard 
        variants={item}
        progress={<CircularProgress percentage={100} color="text-yellow-500" icon={<Trophy size={18} />} />}
        label="Total Games" 
        value={stats.gamesPlayed} 
      />
      <StatCard 
        variants={item}
        progress={<CircularProgress percentage={winRate} color="text-primary" icon={<Swords size={18} />} />}
        label="P1/X Wins" 
        value={stats.playerXWins} 
        subtext={`${winRate}% Win Rate`}
      />
      <StatCard 
        variants={item}
        progress={<CircularProgress percentage={gameMode === '1p' ? aiWinRate : 100} color="text-secondary" icon={<Brain size={18} />} />}
        label="P2/O Wins" 
        value={stats.playerOWins} 
        subtext={`AI Wins: ${stats.aiWins}`}
      />
      <StatCard 
        variants={item}
        progress={<CircularProgress percentage={100} color="text-gray-400" icon={<Minus size={18} />} />}
        label="Draws" 
        value={stats.draws} 
      />
    </motion.div>
  );
};

const StatCard = ({ progress, label, value, subtext, variants }) => (
  <motion.div 
    variants={variants}
    className="glass-panel p-4 flex flex-col items-center text-center hover:bg-white/5 transition-colors duration-300 group"
  >
    {progress}
    <div className="text-2xl sm:text-3xl font-black text-text/90 mb-1 group-hover:scale-110 transition-transform">
      <AnimatedCounter value={value} />
    </div>
    <div className="text-[10px] sm:text-xs text-text/60 font-medium uppercase tracking-wide">{label}</div>
    {subtext && (
      <div className="text-[9px] sm:text-[10px] text-text/40 mt-1">{subtext}</div>
    )}
  </motion.div>
);

export default Dashboard;
