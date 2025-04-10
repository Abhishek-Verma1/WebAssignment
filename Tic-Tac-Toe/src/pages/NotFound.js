import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Message>Page does not exist.</Message>
      <Button as={Link} to="/">
        Go to Home Page
      </Button>
    </NotFoundContainer>
  );
};

export default NotFound;
