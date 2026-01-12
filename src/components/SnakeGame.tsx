import { useEffect, useRef, useState } from 'react'
import './SnakeGame.css'

interface SnakeGameProps {
  onBack: () => void
}

export default function SnakeGame({ onBack }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    food: { x: 15, y: 15 },
    gridSize: 20,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 400

    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return
      const dir = gameStateRef.current.direction
      switch (e.key) {
        case 'ArrowUp':
          if (dir.y === 0) gameStateRef.current.direction = { x: 0, y: -1 }
          break
        case 'ArrowDown':
          if (dir.y === 0) gameStateRef.current.direction = { x: 0, y: 1 }
          break
        case 'ArrowLeft':
          if (dir.x === 0) gameStateRef.current.direction = { x: -1, y: 0 }
          break
        case 'ArrowRight':
          if (dir.x === 0) gameStateRef.current.direction = { x: 1, y: 0 }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    const gameLoop = setInterval(() => {
      if (gameOver) return

      const { snake, direction, food, gridSize } = gameStateRef.current
      const head = { ...snake[0] }
      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= canvas.width / gridSize ||
        head.y < 0 ||
        head.y >= canvas.height / gridSize
      ) {
        setGameOver(true)
        return
      }

      // Check self collision
      if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return
      }

      snake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        gameStateRef.current.food = {
          x: Math.floor(Math.random() * (canvas.width / gridSize)),
          y: Math.floor(Math.random() * (canvas.height / gridSize)),
        }
      } else {
        snake.pop()
      }

      // Draw
      ctx.fillStyle = '#2d5016'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw snake
      ctx.fillStyle = '#4ade80'
      snake.forEach((segment) => {
        ctx.fillRect(
          segment.x * gridSize,
          segment.y * gridSize,
          gridSize - 2,
          gridSize - 2
        )
      })

      // Draw food
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
      )
    }, 150)

    return () => {
      clearInterval(gameLoop)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameOver])

  const handleRestart = () => {
    setGameOver(false)
    setScore(0)
    gameStateRef.current = {
      snake: [{ x: 10, y: 10 }],
      direction: { x: 1, y: 0 },
      food: { x: 15, y: 15 },
      gridSize: 20,
    }
  }

  return (
    <div className="snake-game-container">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Menu
        </button>
        <div className="score">Score: {score}</div>
      </div>
      <div className="game-wrapper">
        <canvas ref={canvasRef} className="game-canvas"></canvas>
        {gameOver && (
          <div className="game-over-overlay">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button onClick={handleRestart}>Play Again</button>
          </div>
        )}
        {!gameOver && (
          <div className="game-instructions">
            <p>Use Arrow Keys to move</p>
          </div>
        )}
      </div>
    </div>
  )
}
