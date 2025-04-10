import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <HomeContainer>
      <Title>Tic-Tac-Toe Game</Title>
      <ActionContainer>
        {isAuthenticated ? (
          <Button as={Link} to="/game?new=true">
            Play Now
          </Button>
        ) : (
          <>
            <Button as={Link} to="/login" margin="0 0 1rem">
              Login to Play
            </Button>
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </>
        )}
      </ActionContainer>
    </HomeContainer>
  );
};

export default Home; 