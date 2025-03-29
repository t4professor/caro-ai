import { CellValue, Player } from '../types/game';
import Cell from './Cell';
import './Board.css';

interface BoardProps {
  board: CellValue[][];
  onCellClick: (row: number, col: number) => void;
  winningCells: [number, number][] | null;
  currentPlayer: Player;
}

const Board = ({ board, onCellClick, winningCells, currentPlayer }: BoardProps) => {
  const isWinningCell = (row: number, col: number): boolean => {
    return !!winningCells?.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isWinner={isWinningCell(rowIndex, colIndex)}
              currentPlayer={currentPlayer}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
