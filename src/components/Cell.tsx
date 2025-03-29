import { CellValue } from '../types/game';
import './Cell.css';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinner?: boolean;
}

const Cell = ({ value, onClick, isWinner }: CellProps) => {
  return (
    <button 
      className={`cell ${value ? 'cell-filled' : 'cell-empty'} ${isWinner ? 'cell-winner' : ''}`}
      onClick={onClick}
      disabled={value !== null}
      aria-label={value || 'Empty cell'}
    >
      {value}
    </button>
  );
};

export default Cell;
