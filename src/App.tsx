import React, { useState } from 'react';
import './App.css';

type SquareValue = 'X' | 'O' | null;

const App: React.FC = () => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board) || isBoardFull(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull(board)
    ? 'Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={board} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

interface BoardProps {
  squares: SquareValue[];
  onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  const renderSquare = (index: number) => (
    <Square value={squares[index]} onClick={() => onClick(index)} />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isBoardFull = (squares: SquareValue[]): boolean => {
  return squares.every(square => square !== null);
};

export default App;
