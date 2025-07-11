import React from 'react';
import { colors } from '../tokens/colors';

interface ButtonProps {
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
  const getButtonStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.6 : 1
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary[500],
        color: colors.neutral[50],
        '&:hover': {
          backgroundColor: colors.primary[600]
        }
      },
      secondary: {
        backgroundColor: colors.neutral[100],
        color: colors.neutral[900],
        '&:hover': {
          backgroundColor: colors.neutral[200]
        }
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.primary[500],
        border: `2px solid ${colors.primary[500]}`,
        '&:hover': {
          backgroundColor: colors.primary[50]
        }
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

export default Button;