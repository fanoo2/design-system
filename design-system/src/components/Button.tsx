
import React from 'react';
import { colors } from '../tokens/colors';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  onClick, 
  disabled = false 
}) => {
  const getButtonStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      border: 'none',
      borderRadius: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.6 : 1,
      fontFamily: 'inherit'
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary[500],
        color: colors.neutral[50]
      },
      secondary: {
        backgroundColor: colors.neutral[100],
        color: colors.neutral[900]
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.primary[500],
        border: `2px solid ${colors.primary[500]}`
      }
    };

    const sizeStyles = {
      small: {
        padding: '8px 16px',
        fontSize: '14px'
      },
      medium: {
        padding: '12px 24px',
        fontSize: '16px'
      },
      large: {
        padding: '16px 32px',
        fontSize: '18px'
      }
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size]
    };
  };

  return (
    <button
      style={getButtonStyles()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
