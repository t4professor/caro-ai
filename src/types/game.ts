export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[][];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winningCells: [number, number][] | null;
  blockRule: boolean;
  gameStarted: boolean;
}
