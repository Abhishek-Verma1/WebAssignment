//TODO: Code optimization required

import { useCallback, useRef, useState } from 'react';
import StatsService from '../api/statsService';

const initialState = {
  wins: 0,
  losses: 0,
  draws: 0,
  loading: false,
  error: null,
};

//TODO: We have more scope of improvements

const useStats = () => {
  const [statsState, setStatsState] = useState(initialState);
  const isRequestInProgress = useRef(false);
  const getUserStats = useCallback(async () => {
    if (isRequestInProgress.current) {
      return;
    }

    try {
      isRequestInProgress.current = true;
      setStatsState(state => ({ ...state, loading: true, error: null }));
      const data = await StatsService.getUserStats();

      setStatsState(state => ({
        ...state,
        loading: false,
        wins: data.stats?.wins || data.wins || 0,
        losses: data.stats?.losses || data.losses || 0,
        draws: data.stats?.draws || data.draws || 0,
        error: null,
      }));
      return data;
    } catch (error) {
      setStatsState(state => ({
        ...state,
        loading: false,
        error: error.message || 'Failed to get user stats'
      }));
      throw error;
    } finally {
      setTimeout(() => {
        isRequestInProgress.current = false;
      }, 200);
    }
  }, []);

  const recordGameResult = useCallback(async (result) => {
    try {
      setStatsState(state => ({ ...state, loading: true, error: null }));

      await StatsService.recordGameResult(result);

      setStatsState(state => {
        let newState = { ...state, loading: false };
        if (result === 'win') newState.wins += 1;
        else if (result === 'loss') newState.losses += 1;
        else if (result === 'draw') newState.draws += 1;
        return newState;
      });
      getUserStats();
    } catch (error) {
      setStatsState(state => ({
        ...state,
        loading: false,
        error: error.message || 'Failed to record game result'
      }));
      throw error;
    }
  }, [getUserStats]);

  const clearError = useCallback(() => {
    setStatsState(state => ({ ...state, error: null }));
  }, []);

  return {
    ...statsState,
    getUserStats,
    recordGameResult,
    clearError
  };
};

export default useStats; 