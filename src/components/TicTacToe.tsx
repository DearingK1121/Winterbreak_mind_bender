import { useState } from 'react'
import './TicTacToe.css'

interface TicTacToeProps {
  onBack: () => void
}

type Player = 'X' | 'O' | null

export default function TicTacToe({ onBack }: TicTacToeProps) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Player | 'Tie' | null>(null)

  const checkWinner = (squares: Player[]): Player | 'Tie' | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }

    if (squares.every((square) => square !== null)) {
      return 'Tie'
    }

    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
  }

  return (
    <div className="tic-tac-toe-container">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Menu
        </button>
        <div className="game-status">
          {winner
            ? winner === 'Tie'
              ? "It's a Tie!"
              : `Winner: ${winner}`
            : `Current Player: ${currentPlayer}`}
        </div>
      </div>
      <div className="tic-tac-toe-wrapper">
        <div className="board">
          {board.map((cell, index) => (
            <button
              key={index}
              className="cell"
              onClick={() => handleClick(index)}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))}
        </div>
        <button className="reset-button" onClick={handleReset}>
          Reset Game
        </button>
      </div>
    </div>
  )
}
