import './MainMenu.css'

interface App {
  id: string
  name: string
  icon: string
  description: string
}

interface MainMenuProps {
  apps: App[]
  onAppSelect: (appId: string) => void
}

export default function MainMenu({ apps, onAppSelect }: MainMenuProps) {
  return (
    <div className="main-menu">
      <div className="menu-header">
        <h1>Winterbreak Mind Bender</h1>
        <p>Select an app to play</p>
      </div>
      <div className="apps-grid">
        {apps.map((app) => (
          <div
            key={app.id}
            className="app-card"
            onClick={() => onAppSelect(app.id)}
          >
            <div className="app-icon">{app.icon}</div>
            <h3>{app.name}</h3>
            <p>{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
