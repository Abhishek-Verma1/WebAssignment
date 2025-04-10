import React, { useEffect } from 'react';
import styled from 'styled-components';
import useStats from '../hooks/useStats';

//TODO: Code cleaning and optimization required
const StatsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 5px solid
    ${(props) => {
    if (props.type === 'wins') return '#27ae60';
    if (props.type === 'losses') return '#e74c3c';
    return '#f39c12';
  }};
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  color: #7f8c8d;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 2rem 0;
`;

const ErrorText = styled.div`
  color: #e74c3c;
  text-align: center;
  margin: 2rem 0;
`;

const PlayButton = styled.button`
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3498db;
  }
`;

const Stats = () => {
  const { wins, losses, draws, loading, error, getUserStats } = useStats();

  useEffect(() => {
    getUserStats();
  }, [getUserStats]);

  const totalGames = (wins || 0) + (losses || 0) + (draws || 0);

  const winRate = totalGames > 0 ? Math.round(((wins || 0) / totalGames) * 100) : 0;

  if (loading) {
    return (
      <StatsContainer>
        <Title>Game Stats</Title>
        <LoadingText>Loading game stats...</LoadingText>
      </StatsContainer>
    );
  }

  if (error) {
    return (
      <StatsContainer>
        <Title>Game Stats</Title>
        <ErrorText>Error loading Stats: {error}</ErrorText>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer>
      <Title>Game Stats</Title>
      <StatsGrid>
        <StatCard type="wins">
          <StatValue>{wins}</StatValue>
          <StatLabel>wins</StatLabel>
        </StatCard>

        <StatCard type="losses">
          <StatValue>{losses}</StatValue>
          <StatLabel>losses</StatLabel>
        </StatCard>
        <StatCard type="draws">
          <StatValue>{draws}</StatValue>
          <StatLabel>draws</StatLabel>
        </StatCard>
      </StatsGrid>

      <StatsGrid style={{ marginTop: '2rem' }}>
        <StatCard>
          <StatValue>{totalGames}</StatValue>
          <StatLabel>total Games</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{winRate}%</StatValue>
          <StatLabel>winning percentage</StatLabel>
        </StatCard>
      </StatsGrid>

      <div style={{ textAlign: 'center' }}>
        <PlayButton onClick={() => window.location.href = '/game'}>
          play a new game
        </PlayButton>
      </div>
    </StatsContainer>
  );
};

export default Stats; 