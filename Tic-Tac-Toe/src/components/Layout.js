import React from 'react';
import styled from 'styled-components';
import Header from './Header';

//TODO: Code cleaning required

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <MainContainer>
      <Header />
      <Content>{children}</Content>
      <Footer>
        <p>© {new Date().getFullYear()} Tic-Tac-Toe React.JS Game</p>
      </Footer>
    </MainContainer>
  );
};

export default Layout; 