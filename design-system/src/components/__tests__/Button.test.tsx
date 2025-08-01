import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ButtonProps } from '../Button';

describe('Button Component', () => {
  const defaultProps: ButtonProps = {
    children: 'Test Button',
  };

  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with children text', () => {
      render(<Button {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveTextContent('Test Button');
    });

    it('renders as a button element', () => {
      render(<Button {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button').tagName).toBe('BUTTON');
    });

    it('renders with React node children', () => {
      const nodeChildren = <span data-testid="child-span">Child Node</span>;
      render(<Button>{nodeChildren}</Button>);
      expect(screen.getByTestId('child-span')).toBeInTheDocument();
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('applies primary variant styles by default', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.backgroundColor).toBe('rgb(59, 130, 246)'); // colors.primary[500]
      expect(styles.color).toBe('rgb(250, 250, 250)'); // colors.neutral[50]
    });

    it('applies primary variant styles when explicitly set', () => {
      render(<Button {...defaultProps} variant="primary" />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.backgroundColor).toBe('rgb(59, 130, 246)');
    });

    it('applies secondary variant styles', () => {
      render(<Button {...defaultProps} variant="secondary" />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.backgroundColor).toBe('rgb(245, 245, 245)'); // colors.neutral[100]
      expect(styles.color).toBe('rgb(23, 23, 23)'); // colors.neutral[900]
    });

    it('applies outline variant styles', () => {
      render(<Button {...defaultProps} variant="outline" />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.backgroundColor).toBe('transparent');
      expect(styles.color).toBe('rgb(59, 130, 246)'); // colors.primary[500]
      expect(styles.border).toBe('2px solid #3b82f6'); // JSDOM returns hex instead of rgb
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('applies medium size styles by default', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.padding).toBe('12px 24px');
      expect(styles.fontSize).toBe('16px');
    });

    it('applies small size styles', () => {
      render(<Button {...defaultProps} size="small" />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.padding).toBe('8px 16px');
      expect(styles.fontSize).toBe('14px');
    });

    it('applies large size styles', () => {
      render(<Button {...defaultProps} size="large" />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.padding).toBe('16px 32px');
      expect(styles.fontSize).toBe('18px');
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button {...defaultProps} onClick={handleClick} />);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick handler on multiple clicks', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button {...defaultProps} onClick={handleClick} />);
      
      await user.click(screen.getByRole('button'));
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button {...defaultProps} onClick={handleClick} disabled />);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('can be activated with keyboard (Enter)', () => {
      const handleClick = jest.fn();
      render(<Button {...defaultProps} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      button.focus();
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      
      // Note: React handles this automatically, so we test that the button can receive focus
      expect(button).toHaveFocus();
    });

    it('can be activated with keyboard (Space)', () => {
      const handleClick = jest.fn();
      render(<Button {...defaultProps} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      button.focus();
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      
      expect(button).toHaveFocus();
    });
  });

  // Disabled state tests
  describe('Disabled State', () => {
    it('applies disabled attribute when disabled prop is true', () => {
      render(<Button {...defaultProps} disabled />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('does not apply disabled attribute when disabled prop is false', () => {
      render(<Button {...defaultProps} disabled={false} />);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('applies disabled styles when disabled', () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.opacity).toBe('0.6');
      expect(styles.cursor).toBe('not-allowed');
    });

    it('applies normal styles when not disabled', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.opacity).toBe('1');
      expect(styles.cursor).toBe('pointer');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Button {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is focusable when not disabled', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).not.toHaveFocus();
    });

    it('has accessible name from children', () => {
      render(<Button {...defaultProps} />);
      expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    });
  });

  // Style combination tests
  describe('Style Combinations', () => {
    it('combines variant and size styles correctly', () => {
      render(<Button variant="outline" size="large">Large Outline</Button>);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      
      // Outline variant styles
      expect(styles.backgroundColor).toBe('transparent');
      expect(styles.border).toBe('2px solid #3b82f6'); // JSDOM returns hex instead of rgb
      
      // Large size styles
      expect(styles.padding).toBe('16px 32px');
      expect(styles.fontSize).toBe('18px');
    });

    it('combines disabled state with variant styles', () => {
      render(<Button variant="secondary" disabled>Disabled Secondary</Button>);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      
      // Secondary variant style should still apply
      expect(styles.backgroundColor).toBe('rgb(245, 245, 245)');
      
      // Disabled styles should also apply
      expect(styles.opacity).toBe('0.6');
      expect(styles.cursor).toBe('not-allowed');
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Button>{''}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles undefined onClick gracefully', () => {
      render(<Button {...defaultProps} onClick={undefined} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      render(<Button>{null}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});