import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle from '../assets/circle.png';
import cross from '../assets/cross.png';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (num) => {
    if (lock || board[num]) return;  // Prevent overwriting moves

    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? "X" : "O"; 
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (boardState) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        won(boardState[a]); 
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (titleRef.current) {
      titleRef.current.innerHTML = `Congratulations: <img src="${winner === 'X' ? cross : circle}" alt="Winner"/> is Winner`;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCount(0);
    setLock(false);
    if (titleRef.current) {
      titleRef.current.innerText = "Tic Tac Toe Game In React";
    }
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="row" key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div className="boxes" key={index} onClick={() => toggle(index)}>
                  {board[index] && <img src={board[index] === "X" ? cross : circle} alt="mark" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
