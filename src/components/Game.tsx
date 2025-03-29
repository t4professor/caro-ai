import { useState, useEffect } from 'react';
import { Board as BoardType, Player, GameState } from '../types/game';
import Board from './Board';
import './Game.css';

const BOARD_SIZE = 15;
const WIN_CONDITION = 5;

const createBoard = (): BoardType =>
  Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createBoard(),
    currentPlayer: 'X',
    winner: null,
    winningCells: null,
    blockRule: sessionStorage.getItem('blockRule') === 'true',
    gameStarted: false,
  });

  const [theme, setTheme] = useState(() => 
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const checkWin = (board: BoardType, row: number, col: number, player: Player): [boolean, [number, number][]] => {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal
      [1, -1],  // anti-diagonal
    ];

    for (const [dx, dy] of directions) {
      const winningCells: [number, number][] = [[row, col]];
      let count = 1;
      let forwardBlocked = false;
      let backwardBlocked = false;
      
      // Check forward
      for (let i = 1; i <= WIN_CONDITION; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        
        if (!isValidPosition(newRow, newCol)) {
          forwardBlocked = true;
          break;
        }
        
        const cell = board[newRow][newCol];
        if (cell === player) {
          winningCells.push([newRow, newCol]);
          count++;
        } else {
          forwardBlocked = cell !== null;
          break;
        }
      }
      
      // Check backward
      for (let i = 1; i <= WIN_CONDITION; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        
        if (!isValidPosition(newRow, newCol)) {
          backwardBlocked = true;
          break;
        }
        
        const cell = board[newRow][newCol];
        if (cell === player) {
          winningCells.push([newRow, newCol]);
          count++;
        } else {
          backwardBlocked = cell !== null;
          break;
        }
      }
      
      // Win condition: exactly 5 in a row and not blocked at both ends
      if (count === WIN_CONDITION && (!gameState.blockRule || !(forwardBlocked && backwardBlocked))) {
        return [true, winningCells];
      }
      // More than 5 in a row is always a win
      if (count > WIN_CONDITION) {
        return [true, winningCells.slice(0, WIN_CONDITION)];
      }
    }
    return [false, []];
  };

  const isValidPosition = (row: number, col: number): boolean =>
    row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;

  const handleCellClick = (row: number, col: number) => {
    if (gameState.board[row][col] || gameState.winner) return;

    // Set gameStarted on first move
    const isFirstMove = !gameState.gameStarted;
    const newBoard = gameState.board.map((r) => [...r]);
    newBoard[row][col] = gameState.currentPlayer;

    const [hasWon, winningCells] = checkWin(newBoard, row, col, gameState.currentPlayer);
    
    const newState = {
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? ('O' as Player) : ('X' as Player),
      winner: hasWon ? gameState.currentPlayer : null,
      winningCells: hasWon ? winningCells : null,
      blockRule: gameState.blockRule,
      gameStarted: true,
    };
    
    setGameState(newState);
  };

  const resetGame = () => {
    setGameState({
      board: createBoard(),
      currentPlayer: 'X',
      winner: null,
      winningCells: null,
      blockRule: sessionStorage.getItem('blockRule') === 'true',
      gameStarted: false,
    });
  };

  const toggleBlockRule = () => {
    setGameState(prev => {
      const newBlockRule = !prev.blockRule;
      sessionStorage.setItem('blockRule', String(newBlockRule));
      return {
        ...prev,
        blockRule: newBlockRule
      };
    });
  };

  const canToggleRule = !gameState.gameStarted || gameState.winner;

  return (
    <div className="game">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <h1 className='game-title'>Caro Chess</h1>
      <div className="game-settings">
        <div className="rule-group">
          <label className={`switch ${!canToggleRule ? 'disabled' : ''}`}>
            <input
              type="checkbox"
              checked={gameState.blockRule}
              onChange={toggleBlockRule}
              disabled={!canToggleRule}
            />
            <span className="slider"></span>
          </label>
          <span className="rule-label">Block rule enabled</span>
        </div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className={`game-info ${gameState.winner ? 'winner' : ''}`}>
        {gameState.winner ? (
          <div>Winner: {gameState.winner}</div>
        ) : (
          <div>Current player: {gameState.currentPlayer}</div>
        )}
      </div>
      <Board 
        board={gameState.board} 
        onCellClick={handleCellClick} 
        winningCells={gameState.winningCells}
        currentPlayer={gameState.currentPlayer}
      />
    </div>
  );
};

export default Game;
