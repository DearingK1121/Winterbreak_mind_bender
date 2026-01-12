import { useState } from 'react'
import './RockPaperScissors.css'

interface RockPaperScissorsProps {
  onBack: () => void
}

type Choice = 'rock' | 'paper' | 'scissors' | null

export default function RockPaperScissors({ onBack }: RockPaperScissorsProps) {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null)
  const [computerChoice, setComputerChoice] = useState<Choice>(null)
  const [result, setResult] = useState<string>('')
  const [score, setScore] = useState({ player: 0, computer: 0 })

  const choices: Choice[] = ['rock', 'paper', 'scissors']

  const getEmoji = (choice: Choice) => {
    switch (choice) {
      case 'rock':
        return '🪨'
      case 'paper':
        return '📄'
      case 'scissors':
        return '✂️'
      default:
        return '❓'
    }
  }

  const playRound = (player: Choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)]
    setPlayerChoice(player)
    setComputerChoice(computer)

    if (player === computer) {
      setResult("It's a tie!")
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      setResult('You win! 🎉')
      setScore((prev) => ({ ...prev, player: prev.player + 1 }))
    } else {
      setResult('Computer wins! 😢')
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }))
    }
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult('')
    setScore({ player: 0, computer: 0 })
  }

  return (
    <div className="rps-container">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Menu
        </button>
        <div className="score-display">
          <div>You: {score.player}</div>
          <div>Computer: {score.computer}</div>
        </div>
      </div>
      <div className="rps-wrapper">
        <div className="choices-section">
          <div className="choice-display">
            <div className="choice-box">
              <div className="choice-emoji">{getEmoji(playerChoice)}</div>
              <div className="choice-label">You</div>
            </div>
            <div className="vs">VS</div>
            <div className="choice-box">
              <div className="choice-emoji">{getEmoji(computerChoice)}</div>
              <div className="choice-label">Computer</div>
            </div>
          </div>
          {result && <div className="result-message">{result}</div>}
        </div>
        <div className="buttons-section">
          <button
            className="choice-button"
            onClick={() => playRound('rock')}
          >
            🪨 Rock
          </button>
          <button
            className="choice-button"
            onClick={() => playRound('paper')}
          >
            📄 Paper
          </button>
          <button
            className="choice-button"
            onClick={() => playRound('scissors')}
          >
            ✂️ Scissors
          </button>
        </div>
        <button className="reset-button" onClick={resetGame}>
          Reset Score
        </button>
      </div>
    </div>
  )
}
