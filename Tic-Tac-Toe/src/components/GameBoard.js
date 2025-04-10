import React from 'react';
import styled from 'styled-components';

//TODO: Code cleaning required

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
  max-width: 400px; /* Set a max width for the entire component */
  margin: 20px auto;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  background-color: #2c3e50;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Cell = styled.div`
  background-color: white;
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Creates a perfect square */
  position: relative;
  border-radius: 5px;
  transition: background-color 0.2s;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: ${(props) => (props.clickable ? '#f0f0f0' : 'white')};
  }
`;

const CellContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: min(10vw, 48px); /* Responsive font size with a maximum */
  font-weight: bold;
  color: #2c3e50;
`;

const Status = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: ${props => props.status === 'won' || props.status === 'draw' ? '24px' : '20px'};
  font-weight: bold;
  text-align: center;
  min-height: 40px;
  background-color: ${props =>
    props.status === 'won'
      ? (props.playerTurn ? 'rgba(231, 76, 60, 0.1)' : 'rgba(39, 174, 96, 0.1)')
      : props.status === 'draw'
        ? 'rgba(243, 156, 18, 0.1)'
        : 'transparent'
  };
  border-radius: 6px;
  color: ${(props) => {
    if (props.status === 'won') {
      return props.playerTurn ? '#e74c3c' : '#27ae60';
    }
    if (props.status === 'draw') return '#f39c12';
    return '#2c3e50';
  }};
  ${props => (props.status === 'won' || props.status === 'draw') && `
    text-shadow: 0 0 1px rgba(0,0,0,0.2);
    border: 1px solid ${props.status === 'won'
      ? (props.playerTurn ? 'rgba(231, 76, 60, 0.2)' : 'rgba(39, 174, 96, 0.2)')
      : 'rgba(243, 156, 18, 0.2)'
    };
  `}
`;

const GameBoard = ({ board, onCellClick, gameStatus, playerTurn }) => {

  const safeBoard = Array.isArray(board) ? board : [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const renderCell = (value) => {
    if (value === 1) return 'O';
    if (value === -1) return 'X';
    return '';
  };

  const isCellClickable = (row, col) => {
    if (!safeBoard || !safeBoard[row] || typeof safeBoard[row][col] === 'undefined') {
      return false;
    }
    return playerTurn && safeBoard[row][col] === 0 && gameStatus === 'ongoing';
  };

  //Can write in a better way also
  const renderStatus = () => {
    const message = gameStatus === 'won'
      ? (playerTurn ? 'Computer Won!' : 'You Won!')
      : gameStatus === 'draw'
        ? "It's a Draw!"
        : playerTurn
          ? 'Your Turn (X)'
          : "Computer's Turn (O)";
          
    return message;
  };

  return (
    <BoardContainer>
      <Board>
        {safeBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isClickable = isCellClickable(rowIndex, colIndex);
            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                onClick={() => {
                  if (isClickable) {
                    onCellClick(rowIndex, colIndex);
                  }
                }}
                clickable={isClickable}
              >
                <CellContent>
                  {renderCell(cell)}
                </CellContent>
              </Cell>
            );
          })
        )}
      </Board>
      {/* Force status message to be shown no matter what */}
      <Status data-testid="game-status" status={gameStatus} playerTurn={playerTurn}>
        {renderStatus()}
      </Status>
    </BoardContainer>
  );
};

export default GameBoard; 