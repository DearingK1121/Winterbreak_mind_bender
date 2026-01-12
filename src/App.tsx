import { useState } from 'react'
import './App.css'
import MainMenu from './components/MainMenu'
import DinoGame from './components/DinoGame'
import SnakeGame from './components/SnakeGame'
import TicTacToe from './components/TicTacToe'
import MemoryGame from './components/MemoryGame'
import RockPaperScissors from './components/RockPaperScissors'
import ReactionTime from './components/ReactionTime'

type AppId = 'menu' | 'dino' | 'snake' | 'tictactoe' | 'memory' | 'rps' | 'reaction'

function App() {
  const [currentApp, setCurrentApp] = useState<AppId>('menu')

  const apps = [
    {
      id: 'dino',
      name: 'Chrome Dinosaur',
      icon: '🦕',
      description: 'Jump over obstacles and survive!',
    },
    {
      id: 'snake',
      name: 'Snake',
      icon: '🐍',
      description: 'Classic snake game - eat food and grow!',
    },
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      icon: '⭕',
      description: 'Play against yourself or a friend!',
    },
    {
      id: 'memory',
      name: 'Memory Cards',
      icon: '🧠',
      description: 'Match pairs of cards and test your memory!',
    },
    {
      id: 'rps',
      name: 'Rock Paper Scissors',
      icon: '✂️',
      description: 'Challenge the computer to a classic game!',
    },
    {
      id: 'reaction',
      name: 'Reaction Time',
      icon: '⚡',
      description: 'Test how fast your reflexes are!',
    },
  ]

  const handleAppSelect = (appId: string) => {
    setCurrentApp(appId as AppId)
  }

  const handleBackToMenu = () => {
    setCurrentApp('menu')
  }

  return (
    <div className="app">
      {currentApp === 'menu' && (
        <MainMenu apps={apps} onAppSelect={handleAppSelect} />
      )}
      {currentApp === 'dino' && <DinoGame onBack={handleBackToMenu} />}
      {currentApp === 'snake' && <SnakeGame onBack={handleBackToMenu} />}
      {currentApp === 'tictactoe' && <TicTacToe onBack={handleBackToMenu} />}
      {currentApp === 'memory' && <MemoryGame onBack={handleBackToMenu} />}
      {currentApp === 'rps' && <RockPaperScissors onBack={handleBackToMenu} />}
      {currentApp === 'reaction' && <ReactionTime onBack={handleBackToMenu} />}
    </div>
  )
}

export default App
