import { useState, useEffect } from 'react'
import './MemoryGame.css'

interface MemoryGameProps {
  onBack: () => void
}

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']

export default function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)
    setMoves((prev) => prev + 1)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second])
        setFlipped([])
        if (matched.length + 2 === cards.length) {
          setTimeout(() => setGameWon(true), 500)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  return (
    <div className="memory-game-container">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Menu
        </button>
        <div className="game-info">
          <div>Moves: {moves}</div>
          <div>Matched: {matched.length / 2} / {emojis.length}</div>
        </div>
      </div>
      <div className="memory-game-wrapper">
        <div className="memory-grid">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index)
            return (
              <div
                key={index}
                className={`memory-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-front">?</div>
                <div className="card-back">{card}</div>
              </div>
            )
          })}
        </div>
        {gameWon && (
          <div className="win-message">
            <h2>🎉 You Won!</h2>
            <p>Completed in {moves} moves</p>
            <button onClick={startNewGame}>Play Again</button>
          </div>
        )}
        <button className="reset-button" onClick={startNewGame}>
          New Game
        </button>
      </div>
    </div>
  )
}
