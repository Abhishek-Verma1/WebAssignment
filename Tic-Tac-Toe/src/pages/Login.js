import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import useAuth from '../hooks/useAuth';

//TODO: Code optimization required

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #f9e7e7;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #e74c3c;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorIcon = styled.span`
  margin-right: 8px;
  font-weight: bold;
`;

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, loading, error, login, resetAuthError } = useAuth();

  useEffect(() => {
    resetAuthError();
  }, [resetAuthError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/game');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <LoginContainer>
      <Title>Login to Play</Title>
      <Form onSubmit={handleSubmit}>
        {error && (
          <ErrorMessage>
            <ErrorIcon>⚠️</ErrorIcon>
            {error}
          </ErrorMessage>
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" fullWidth margin="1rem 0 0" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      <RegisterLink>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#3498db' }}>
          Register here
        </Link>
      </RegisterLink>
    </LoginContainer>
  );
};

export default Login; 