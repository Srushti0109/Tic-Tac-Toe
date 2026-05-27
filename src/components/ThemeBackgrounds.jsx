import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeBackgrounds = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-background transition-colors duration-700">
      {theme === 'space' && <SpaceBackground />}
      {theme === 'cyberpunk' && <CyberpunkBackground />}
      {theme === 'retro' && <RetroBackground />}
      {theme === 'glass' && <GlassBackground />}
      {theme === 'minimal' && <MinimalBackground />}
    </div>
  );
};

const SpaceBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10
    }));
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black" />
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-80"
          style={{ width: star.size, height: star.size, left: `${star.x}%`, top: `${star.y}%` }}
          animate={{ y: ['0vh', '-100vh'], opacity: [0, 0.8, 0] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: 'linear', delay: star.delay }}
        />
      ))}
    </>
  );
};

const CyberpunkBackground = () => (
  <>
    <div className="absolute inset-0 bg-black" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-black to-black" />
    <div className="absolute bottom-0 left-0 right-0 h-[60vh] perspective-1000">
      <motion.div 
        className="w-[200%] h-[200%] absolute left-[-50%] top-0 origin-top"
        style={{
          backgroundImage: `
            linear-gradient(transparent 0%, var(--primary) 2%, transparent 2%),
            linear-gradient(90deg, transparent 0%, var(--primary) 2%, transparent 2%)
          `,
          backgroundSize: '40px 40px',
          transform: 'rotateX(75deg) translateZ(0)'
        }}
        animate={{ backgroundPosition: ['0px 0px', '0px 40px'] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  </>
);

const RetroBackground = () => (
  <>
    <div className="absolute inset-0 bg-[#171717]" />
    <div className="absolute inset-0 crt-scanlines opacity-50" />
    <motion.div 
      className="absolute inset-0 bg-black pointer-events-none"
      animate={{ opacity: [0.05, 0.1, 0.05, 0.12, 0.05] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
    />
  </>
);

const GlassBackground = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#1e1b4b]">
    <motion.div 
      className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/30 blur-[120px]"
      animate={{ 
        x: ['0%', '10%', '-5%', '0%'], 
        y: ['0%', '5%', '10%', '0%'] 
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div 
      className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary/30 blur-[100px]"
      animate={{ 
        x: ['0%', '-10%', '5%', '0%'], 
        y: ['0%', '-5%', '15%', '0%'] 
      }}
      transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div 
      className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-accent/20 blur-[150px]"
      animate={{ 
        x: ['0%', '5%', '-10%', '0%'], 
        y: ['0%', '-10%', '-5%', '0%'] 
      }}
      transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const MinimalBackground = () => (
  <div className="absolute inset-0 bg-[#fafafa] flex items-center justify-center opacity-50">
     <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
  </div>
);

export default ThemeBackgrounds;
