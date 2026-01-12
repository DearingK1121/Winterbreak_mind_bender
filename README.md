# Winterbreak Mind Bender

A mind-bending puzzle game built with React, TypeScript, and Vite.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
Winterbreak_mind_bender/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── services/       # API services
│   ├── contexts/       # React contexts
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── App.tsx         # Main App component
│   ├── App.css         # App styles
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── server/              # Backend server (optional)
│   ├── routes/         # API routes
│   ├── controllers/    # Route controllers
│   ├── models/         # Data models
│   ├── middleware/     # Express middleware
│   └── index.js        # Server entry point
├── public/             # Public static files
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS (ready for CSS modules, Tailwind, or styled-components)
- **Linting**: ESLint
- **Formatting**: Prettier
- **Backend**: Express (optional, in server folder)

## 📝 Development

The project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Vite** for fast development and building

## 🎯 Next Steps

1. Add your game logic in `src/components/`
2. Create custom hooks in `src/hooks/` for reusable logic
3. Define types in `src/types/` for TypeScript
4. Add API services in `src/services/` if needed
5. Set up backend routes in `server/routes/` if using the backend

## 📄 License

MIT