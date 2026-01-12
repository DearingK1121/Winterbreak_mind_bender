import { useState, useEffect } from 'react'
import './ReactionTime.css'

interface ReactionTimeProps {
  onBack: () => void
}

export default function ReactionTime({ onBack }: ReactionTimeProps) {
  const [waiting, setWaiting] = useState(false)
  const [ready, setReady] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [times, setTimes] = useState<number[]>([])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (ready && !waiting) {
      const delay = Math.random() * 3000 + 2000 // 2-5 seconds
      timeout = setTimeout(() => {
        setWaiting(true)
        setStartTime(Date.now())
      }, delay)
    }
    return () => clearTimeout(timeout)
  }, [ready, waiting])

  const handleStart = () => {
    setReady(true)
    setWaiting(false)
    setReactionTime(null)
  }

  const handleClick = () => {
    if (!waiting) {
      setReady(false)
      setReactionTime(null)
      alert('Too soon! Wait for the green screen.')
      return
    }

    const time = Date.now() - startTime
    setReactionTime(time)
    setTimes([...times, time])
    setWaiting(false)
    setReady(false)
  }

  const getAverage = () => {
    if (times.length === 0) return 0
    return Math.round(times.reduce((a, b) => a + b, 0) / times.length)
  }

  const reset = () => {
    setReady(false)
    setWaiting(false)
    setReactionTime(null)
    setTimes([])
  }

  return (
    <div className="reaction-container">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Menu
        </button>
        <div className="stats">
          <div>Average: {getAverage()}ms</div>
          <div>Tests: {times.length}</div>
        </div>
      </div>
      <div className="reaction-wrapper">
        <div
          className={`reaction-screen ${waiting ? 'green' : ready ? 'red' : 'gray'}`}
          onClick={handleClick}
        >
          {waiting ? (
            <div className="screen-content">
              <h2>CLICK NOW!</h2>
            </div>
          ) : ready ? (
            <div className="screen-content">
              <h2>Wait for green...</h2>
            </div>
          ) : (
            <div className="screen-content">
              <h2>Click to start</h2>
              <p>When the screen turns green, click as fast as you can!</p>
            </div>
          )}
        </div>
        {reactionTime !== null && (
          <div className="result-display">
            <h3>Your reaction time: {reactionTime}ms</h3>
            <div className="time-rating">
              {reactionTime < 200 ? '⚡ Lightning fast!' : reactionTime < 300 ? '🔥 Excellent!' : reactionTime < 400 ? '👍 Good!' : '💪 Keep practicing!'}
            </div>
          </div>
        )}
        <div className="button-group">
          {!ready && !waiting && (
            <button className="start-button" onClick={handleStart}>
              Start Test
            </button>
          )}
          {times.length > 0 && (
            <button className="reset-button" onClick={reset}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
