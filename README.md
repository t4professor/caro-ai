# Caro Chess Game

A modern implementation of the Caro (Gomoku) chess game built with React and TypeScript. Play the classic game of getting 5 in a row with an optional block rule variation.

## Features

- 🎮 Classic 15x15 Caro chess gameplay
- 🌓 Light/Dark theme support
- 🎯 Block rule toggle option
- 🎉 Winner celebration animations
- 📱 Responsive design
- 🎨 Modern UI/UX

## Tech Stack

- React 19
- TypeScript
- CSS3 (with CSS Variables for theming)
- Vite

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd caro-ai
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Game Rules

- Players take turns placing X's and O's on the board
- The goal is to get 5 marks in a row (horizontally, vertically, or diagonally)
- Block rule (optional):
  - When enabled, having both ends of a line of 5 blocked by opponent's pieces doesn't count as a win
  - This adds strategic depth to the game
- First player uses 'X', second player uses 'O'
- Game ends when either:
  - A player gets 5 in a row
  - The board is completely filled (draw)

## Development

For linting and type checking:
```bash
npm run lint
```

## License

Proprietary - All rights reserved.
See [LICENSE](LICENSE) file for details.
