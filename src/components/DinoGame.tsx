import { useEffect, useRef, useState } from 'react'
import './DinoGame.css'

interface DinoGameProps {
  onBack: () => void
}

export default function DinoGame({ onBack }: DinoGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const isJumpingRef = useRef(false)
  const gameOverRef = useRef(false)
  const gameStateRef = useRef({
    dinoY: 0,
    dinoVelocity: 0,
    obstacles: [] as Array<{ x: number; y: number }>,
    gameSpeed: 2,
    lastObstacle: 0,
  })

  useEffect(() => {
    isJumpingRef.current = isJumping
  }, [isJumping])

  useEffect(() => {
    gameOverRef.current = gameOver
  }, [gameOver])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 200

    const dino = {
      x: 50,
      y: canvas.height - 50,
      width: 40,
      height: 40,
    }

    const groundY = canvas.height - 20

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isJumpingRef.current && !gameOverRef.current) {
        e.preventDefault()
        setIsJumping(true)
        gameStateRef.current.dinoVelocity = -15
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    const gameLoop = () => {
      if (gameOverRef.current) return

      // Clear canvas
      ctx.fillStyle = '#f7f7f7'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ground
      ctx.fillStyle = '#535353'
      ctx.fillRect(0, groundY, canvas.width, 20)

      // Update dino position
      if (isJumpingRef.current) {
        gameStateRef.current.dinoY += gameStateRef.current.dinoVelocity
        gameStateRef.current.dinoVelocity += 0.8 // gravity

        if (gameStateRef.current.dinoY + dino.y >= groundY - dino.height) {
          gameStateRef.current.dinoY = 0
          gameStateRef.current.dinoVelocity = 0
          setIsJumping(false)
        }
      }

      // Draw dino
      ctx.fillStyle = '#535353'
      ctx.fillRect(
        dino.x,
        dino.y + gameStateRef.current.dinoY,
        dino.width,
        dino.height
      )

      // Draw dino legs
      ctx.fillRect(
        dino.x + 5,
        dino.y + dino.height + gameStateRef.current.dinoY,
        8,
        8
      )
      ctx.fillRect(
        dino.x + 25,
        dino.y + dino.height + gameStateRef.current.dinoY,
        8,
        8
      )

      // Update obstacles
      if (Date.now() - gameStateRef.current.lastObstacle > 2000) {
        gameStateRef.current.obstacles.push({
          x: canvas.width,
          y: groundY - 30,
        })
        gameStateRef.current.lastObstacle = Date.now()
      }

      // Draw and move obstacles
      gameStateRef.current.obstacles = gameStateRef.current.obstacles.filter(
        (obstacle) => {
          obstacle.x -= gameStateRef.current.gameSpeed

          // Draw cactus
          ctx.fillStyle = '#535353'
          ctx.fillRect(obstacle.x, obstacle.y, 20, 30)

          // Collision detection
          const dinoRect = {
            x: dino.x,
            y: dino.y + gameStateRef.current.dinoY,
            width: dino.width,
            height: dino.height,
          }

          const obstacleRect = {
            x: obstacle.x,
            y: obstacle.y,
            width: 20,
            height: 30,
          }

          if (
            dinoRect.x < obstacleRect.x + obstacleRect.width &&
            dinoRect.x + dinoRect.width > obstacleRect.x &&
            dinoRect.y < obstacleRect.y + obstacleRect.height &&
            dinoRect.y + dinoRect.height > obstacleRect.y
          ) {
            setGameOver(true)
            return false
          }

          // Remove if off screen
          if (obstacle.x < -20) {
            setScore((prev) => prev + 1)
            return false
          }

          return true
        }
      )

      // Increase game speed
      gameStateRef.current.gameSpeed += 0.001

      requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleRestart = () => {
    setGameOver(false)
    setScore(0)
    setIsJumping(false)
    gameStateRef.current = {
      dinoY: 0,
      dinoVelocity: 0,
      obstacles: [],
      gameSpeed: 2,
      lastObstacle: 0,
    }
  }

  return (
    <div className="dino-game-container">
      <div className="dino-game-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Menu
        </button>
        <div className="score">Score: {score}</div>
      </div>
      <div className="dino-game-wrapper">
        <canvas ref={canvasRef} className="dino-canvas"></canvas>
        {gameOver && (
          <div className="game-over-overlay">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button onClick={handleRestart}>Play Again</button>
          </div>
        )}
        {!gameOver && (
          <div className="game-instructions">
            <p>Press SPACE to jump</p>
          </div>
        )}
      </div>
    </div>
  )
}
