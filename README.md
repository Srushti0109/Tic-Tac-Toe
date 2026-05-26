# Premium AI-Powered Tic-Tac-Toe

A modern, production-quality Tic-Tac-Toe game built with React, Vite, Tailwind CSS, and Framer Motion. This project features a highly polished user interface with glassmorphism, dynamic theming, particle effects, and an unbeatable AI powered by the Minimax algorithm with Alpha-Beta pruning.

## 🚀 Features

- **Unbeatable AI**: The "Hard" difficulty utilizes the Minimax algorithm with Alpha-Beta pruning, ensuring the AI never loses.
- **Dynamic Themes**: Switch between 5 distinct themes (Classic Minimal, Neon Cyberpunk, Space Theme, Retro Arcade, Gradient Glass) in real-time. Themes persist via `localStorage`.
- **Advanced Animations**: Powered by Framer Motion for smooth transitions, hover effects, scale interactions, and UI enter/exit animations.
- **Particle Engine**: Custom animated background particles that react to the current theme.
- **Game Modes**: Play against the AI (1 Player) or against a friend locally (2 Players).
- **Match History & Replays**: Fully functional "Undo" system to revert moves and learn from mistakes.
- **Comprehensive Statistics**: A dynamic dashboard tracking win rates, AI performance, total games, and draws, persisting across sessions.
- **Sound Effects**: Synthesized Web Audio API sound effects for clicks, wins, and draws. Easily swappable for actual sound files.
- **Responsive Design**: Fully mobile-friendly layout optimized for both portrait and landscape viewing.

## 🛠️ Technology Stack

- **React 18** (Hooks, Context API for state management)
- **Vite** (Next-generation frontend tooling for rapid development)
- **Tailwind CSS** (Utility-first styling with custom CSS variables for theming)
- **Framer Motion** (Production-ready animation library)
- **Lucide React** (Beautiful, consistent iconography)
- **Canvas Confetti** (Celebratory animations)

## 📂 Project Structure

```
src/
├── ai/
│   ├── bot.js          # AI decision logic and difficulty handling
│   └── minimax.js      # Core Minimax algorithm with Alpha-Beta pruning
├── components/         # Reusable UI components (Board, Cell, Header, etc.)
├── context/            # Global state management (GameContext, ThemeContext)
├── hooks/              # Custom React hooks (useGameStorage, useSoundEffects)
├── pages/              # Main screen views (StartScreen, GameScreen)
├── themes/             # Theme engine and definitions
├── utils/              # Game logic utilities (win checking, evaluation)
├── App.jsx             # Root application component
├── index.css           # Global styles and Tailwind directives
└── main.jsx            # Entry point
```

## 🧠 AI Architecture

The AI is designed to simulate different levels of play:
- **Easy**: Mostly random moves, occasionally picking the best cell. Simulates a beginner.
- **Medium**: A mix of optimal strategy and mistakes. It will actively block immediate threats but may miss complex forks.
- **Hard**: Implements the **Minimax Algorithm**—a recursive algorithm used for decision-making in game theory. 
  - To optimize performance, **Alpha-Beta Pruning** is used. This technique stops evaluating a move when at least one possibility has been found that proves the move to be worse than a previously examined move. This drastically reduces the number of nodes the AI needs to evaluate in the game tree, ensuring instant, unbeatable decisions.

## 💻 Setup Instructions

1. **Clone the repository** (if not already local).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Asset Management

Sound effects are currently synthesized using the Web Audio API to ensure they work out-of-the-box without requiring external files. To replace them with actual audio files:
1. Place your `.mp3` or `.wav` files inside `src/assets/sounds/`.
2. Update `src/hooks/useSoundEffects.js` to use an audio library like `use-sound` or standard HTML5 `Audio` objects.
