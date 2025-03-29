import { CellValue, Player } from '../types/game';
import './Cell.css';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinner?: boolean;
  currentPlayer: Player;
}

const Cell = ({ value, onClick, isWinner, currentPlayer }: CellProps) => {
  return (
    <button 
      className={`cell ${value ? 'cell-filled' : 'cell-empty'} ${isWinner ? 'cell-winner' : ''}`}
      onClick={onClick}
      disabled={value !== null}
      aria-label={value || 'Empty cell'}
      data-hover-value={value ? undefined : currentPlayer}
    >
      {value}
    </button>
  );
};

export default Cell;
