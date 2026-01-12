import { useState } from 'react'
import './App.css'
import MainMenu from './components/MainMenu'
import DinoGame from './components/DinoGame'

type AppId = 'menu' | 'dino'

function App() {
  const [currentApp, setCurrentApp] = useState<AppId>('menu')

  const apps = [
    {
      id: 'dino',
      name: 'Chrome Dinosaur',
      icon: '🦕',
      description: 'Jump over obstacles and survive!',
    },
    // Add more apps here in the future
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
    </div>
  )
}

export default App
