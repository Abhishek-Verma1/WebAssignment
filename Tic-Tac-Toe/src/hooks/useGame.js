//TODO: Code optimization required

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameService from '../api/gameService';
import PlayerService from '../api/playerService';
import SystemService from '../api/systemService';
import {
  clearError as clearGameError,
  gameFailure,
  gameRequest,
  resetGame as resetGameAction,
  setGameData,
  setPlayerMove,
  updateBoard
} from '../redux/slices/gameSlice';

//TODO: We have more scope of improvements

const useGame = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);

  const createNewGameSession = useCallback(async (startWithPlayer) => {
    try {
      dispatch(gameRequest());
      const data = await GameService.createGameSession(startWithPlayer);

      dispatch(setGameData({
        ...data,
        startWithPlayer
      }));

      return data;
    } catch (error) {
      dispatch(gameFailure(error.message || 'Failed to create game session.....'));
      throw error;
    }
  }, [dispatch]);

  const getExistingGameSession = useCallback(async (sessionId) => {
    try {
      dispatch(gameRequest());
      const data = await GameService.getGameSession(sessionId);

      dispatch(setGameData({
        ...data,
        startWithPlayer: data.playerTurn
      }));

      return data;
    } catch (error) {
      dispatch(gameFailure(error.message || 'Failed to get game session.....'));
      throw error;
    }
  }, [dispatch]);

  const makePlayerMove = useCallback(async (board, row, col, sessionId) => {
    try {
      dispatch(setPlayerMove({ row, col }));
      dispatch(gameRequest());

      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = -1;

      const data = await PlayerService.playerMove(newBoard, sessionId);

      dispatch(updateBoard({
        board: data.board,
        status: data.status,
        isPlayerTurn: false
      }));

      return data;
    } catch (error) {
      dispatch(gameFailure(error.message || 'Failed to make player move....'));
      throw error;
    }
  }, [dispatch]);

  const makeComputerMove = useCallback(async (board, sessionId) => {
    try {
      dispatch(gameRequest());
      const boardCopy = board.map(row => [...row]);

      const data = await SystemService.computerMove(boardCopy, sessionId);
      dispatch(updateBoard({
        board: data.board,
        status: data.status,
        isPlayerTurn: true
      }));
      return data;
    } catch (error) {
      dispatch(gameFailure(error.message || 'Failed to make Computer move.......'));
      throw error;
    }
  }, [dispatch]);

  const checkBoardStatus = useCallback(async (board) => {
    try {
      dispatch(gameRequest());
      const data = await GameService.checkBoard(board);

      dispatch(updateBoard({
        status: data.gameStatus || data.status,
        isPlayerTurn: true
      }));
      return data;
    } catch (error) {
      dispatch(gameFailure(error.message || 'Failed to check board status.....'));
      throw error;
    }
  }, [dispatch]);

  const resetGame = useCallback(() => {
    dispatch(resetGameAction());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearGameError());
  }, [dispatch]);

  return {
    ...gameState,
    createNewGameSession,
    getExistingGameSession,
    makePlayerMove,
    makeComputerMove,
    checkBoardStatus,
    resetGame,
    clearError
  };
};

export default useGame; 