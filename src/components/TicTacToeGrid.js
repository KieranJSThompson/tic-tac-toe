import React, {useEffect, useState} from 'react'
import Node from './Node';
import './TicTacToeGrid.css';
import possiblewins from '../utils/possiblewins.json';

function TicTacToeGrid() {
  const ROWS = 3;
  const COLS = 3;
  const [grid, setGrid] = useState([]);
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerWin, setPlayerWin] = useState('');
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);

  useEffect(() => {
    setup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('player1: ', player1);
    console.log('player2: ', player2);
    checkWin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player1, player2]);

  const checkWin = () => {
    possiblewins.forEach(solution => {
      if (
        player1[solution[0]] &&
        player1[solution[1]] &&
        player1[solution[2]]
      ) {
        setIsGameOver(true);
        setPlayerWin('player1');
        return;
      } else if (
        player2[solution[0]] &&
        player2[solution[1]] &&
        player2[solution[2]]
      ) {
        setIsGameOver(true);
        setPlayerWin('player2');
        return;
      }
    })

    if(Object.keys(player1).length + Object.keys(player2).length === 9) {
      setIsGameOver(true)
      setPlayerWin('Nobody');
      return;
    }
  }

  const setup = () => {
    const grid = new Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
      grid[i] = new Array(COLS);
    };
    createEntries(grid);
    setGrid(grid);
  }

  const createEntries = (grid) => {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        grid[i][j] = undefined;
      }
    }
  };

  const gridWithNodes = (
    <div>
      {grid.map((row, rowIndex) => {
        return (
          <div className="row-wrapper" key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
              <div className="node-div" key={colIndex}>
                <Node
                  key={colIndex}
                  position={[rowIndex, colIndex]}
                  player1Turn={player1Turn}
                  setPlayer1Turn={setPlayer1Turn}
                  setPlayer1={setPlayer1}
                  setPlayer2={setPlayer2}
                />
              </div>
            )})}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
    <h1 style={{margin: 'auto'}}>Tic Tac Toe</h1>
      {!isGameOver ? (
      <div className="grid-wrapper">
        {gridWithNodes}
      </div>
      ) : (
        <div>
          <h1>Game Over</h1>
          <h3>{playerWin} Wins!</h3>
        </div>
      )}
    </>
  )
}

export default TicTacToeGrid
