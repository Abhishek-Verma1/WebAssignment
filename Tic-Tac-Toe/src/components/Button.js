import React from 'react';
import styled from 'styled-components';

//TODO: Later we can remove this

const StyledButton = styled.button`
  background-color: ${(props) => (props.secondary ? '#f0f0f0' : '#2c3e50')};
  color: ${(props) => (props.secondary ? '#2c3e50' : 'white')};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: ${(props) => props.margin || '0'};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${(props) => (props.secondary ? '#e0e0e0' : '#34495e')};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Button = ({
  children,
  onClick,
  secondary,
  disabled,
  fullWidth,
  margin,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      secondary={secondary}
      disabled={disabled}
      fullWidth={fullWidth}
      margin={margin}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 