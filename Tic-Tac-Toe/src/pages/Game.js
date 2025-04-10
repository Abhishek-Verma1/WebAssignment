import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import GameBoard from '../components/GameBoard';
import useGame from '../hooks/useGame';

//TODO: Code cleaning and optimization required

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1rem;
`;

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  margin-top: 2rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  justify-content: center;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  font-size: 1.5rem;
  color: #2c3e50;
`;

const ResultModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ResultContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  max-width: 90%;
  width: 400px;
`;

const ResultTitle = styled.h2`
  margin-bottom: 1rem;
  color: ${props => {
    if (props.result === 'win') return '#27ae60';
    if (props.result === 'loss') return '#e74c3c';
    return '#f39c12';
  }};
`;

const ResultMessage = styled.p`
  margin-bottom: 2rem;
  font-size: 1.2rem;
`;

const Game = () => {
  const location = useLocation();
  const isNewGame = new URLSearchParams(location.search).get('new') === 'true';

  const {
    sessionId,
    board,
    gameStatus,
    playerTurn,
    loading,
    error,
    resetGame,
    createNewGameSession,
    getExistingGameSession,
    makeComputerMove,
    makePlayerMove
  } = useGame();

  const [startWithPlayer, setStartWithPlayer] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (isNewGame) {
      resetGame();
    }
  }, [isNewGame, resetGame]);

  useEffect(() => {
    if (!sessionId && gameStatus === 'idle') {
      console.log("No active session:");
      resetGame();
    } else {
      console.log("Active session:", { sessionId, gameStatus });
    }
  }, [resetGame, sessionId, gameStatus]);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 500);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  //Can improve this dirty logic
  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'x wins' || gameStatus === 'o wins' || gameStatus === 'draw') {
      let result;

      if (gameStatus === 'draw') {
        result = 'draw';
      } else if (gameStatus === 'x wins' || (gameStatus === 'won' && !playerTurn)) {
        result = 'win';
      } else if (gameStatus === 'o wins' || (gameStatus === 'won' && playerTurn)) {
        result = 'loss';
      }

      if (result) {
        setGameResult(result);
        setShowResultModal(true);
      }
    }
  }, [gameStatus, playerTurn]);

  useEffect(() => {
    if (sessionId && !playerTurn && gameStatus === 'ongoing') {
      const timer = setTimeout(() => {
        makeComputerMove(board, sessionId);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [sessionId, playerTurn, gameStatus, board, makeComputerMove]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdFromUrl = urlParams.get('sessionId');
    if (sessionIdFromUrl && !sessionId) {
      getExistingGameSession(sessionIdFromUrl);
    }
  }, [sessionId, getExistingGameSession]);

  const handleCellClick = (row, col) => {
    if (!playerTurn || gameStatus !== 'ongoing') {
      return;
    }
    makePlayerMove(board, row, col, sessionId);
  };

  const handleStartGame = () => {
    setShowResultModal(false);
    setGameResult(null);
    resetGame();
    createNewGameSession(startWithPlayer);
  };

  const handleRestartGame = () => {
    resetGame();
    const newUrl = `${window.location.pathname}?new=true`;
    window.history.pushState({}, '', newUrl);
    setStartWithPlayer(true);
    setGameResult(null);
    setShowResultModal(false);
  };

  const handleCloseResultModal = (startNew = false) => {
    setShowResultModal(false);
    if (startNew) {
      handleStartGame();
    }
  };

  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
    }
  }, [error]);

  const getResultMessage = () => {
    switch (gameResult) {
      case 'win':
        return 'Congratulations! You have won this game!';
      case 'loss':
        return 'You lost this game.';
      case 'draw':
        return "It's a draw!";
      default:
        return '';
    }
  };

  //TODO: Optimization required
  return (
    <GameContainer>
      {showLoading && <LoadingOverlay>Loading...</LoadingOverlay>}
      {showResultModal && gameResult && (
        <ResultModal>
          <ResultContent>
            <ResultTitle result={gameResult}>
              {gameResult === 'win' ? 'Victory!' : gameResult === 'loss' ? 'Defeat!' : 'Draw!'}
            </ResultTitle>
            <ResultMessage>{getResultMessage()}</ResultMessage>
            <Button onClick={() => handleCloseResultModal(true)}>Play Again</Button>
            <Button secondary onClick={() => handleCloseResultModal(false)} style={{ marginLeft: '10px' }}>
              View Game Board
            </Button>
          </ResultContent>
        </ResultModal>
      )}

      <Title>Tic-Tac-Toe React.Js Game</Title>

      {!sessionId || gameStatus === 'idle' ? (
        <StartContainer>
          <RadioContainer>
            <h3>Who will starts first?</h3>
            <RadioGroup>
              <input
                type="radio"
                id="player"
                name="starter"
                checked={startWithPlayer}
                onChange={() => setStartWithPlayer(true)}
              />
              <label htmlFor="player">User (X)</label>
            </RadioGroup>
            <RadioGroup>
              <input
                type="radio"
                id="computer"
                name="starter"
                checked={!startWithPlayer}
                onChange={() => setStartWithPlayer(false)}
              />
              <label htmlFor="computer">Computer (O)</label>
            </RadioGroup>
          </RadioContainer>
          <Button fullWidth onClick={handleStartGame}>
            Start Game
          </Button>
        </StartContainer>
      ) : (
        <>
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            gameStatus={gameStatus}
            playerTurn={playerTurn}
          />

          <ControlsContainer>
            <Button secondary onClick={handleRestartGame}>
              Start New Game
            </Button>
            <Button onClick={() => window.location.href = '/stats'}>
              View Game Stats
            </Button>
          </ControlsContainer>
        </>
      )}
    </GameContainer>
  );
};

export default Game; 