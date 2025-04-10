import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import useGame from '../hooks/useGame';
import Button from './Button';

//TODO: Code cleaning required
const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
  margin-right: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.isOpen ? 'column' : 'row'};
    width: ${props => props.isOpen ? '100%' : 'auto'};
    padding: ${props => props.isOpen ? '1rem 0 0 0' : '0'};
    align-items: ${props => props.isOpen ? 'flex-start' : 'center'};
    gap: ${props => props.isOpen ? '0.5rem' : '1rem'};
    overflow: hidden;
    max-height: ${props => props.isOpen ? '500px' : '0'};
    transition: max-height 0.3s ease-in-out;
    order: ${props => props.isOpen ? '3' : '2'};
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    color: #3498db;
  }
  
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.5rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  order: 2;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { resetGame } = useGame();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    resetGame();
    logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Logo to="/">Tic-Tac-Toe</Logo>

      <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✕' : '☰'}
      </MobileMenuButton>

      <Nav isOpen={isMenuOpen}>
        {isAuthenticated ? (
          <>
            <NavLink to="/game" onClick={() => setIsMenuOpen(false)}>Play Game</NavLink>
            <NavLink to="/stats" onClick={() => setIsMenuOpen(false)}>Statistics</NavLink>
            <UserInfo>
              <span>Hello, {user?.name || 'User'}</span>
              <Button onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }} secondary>
                Logout
              </Button>
            </UserInfo>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
            <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 