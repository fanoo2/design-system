import React from 'react';
interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
