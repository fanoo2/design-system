import { jsx as _jsx } from "react/jsx-runtime";
import { colors } from '../tokens/colors';
export const Button = ({ variant = 'primary', size = 'medium', children, onClick, disabled = false }) => {
    const getButtonStyles = () => {
        const baseStyles = {
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
        return Object.assign(Object.assign(Object.assign({}, baseStyles), variantStyles[variant]), sizeStyles[size]);
    };
    return (_jsx("button", { style: getButtonStyles(), onClick: onClick, disabled: disabled, children: children }));
};
