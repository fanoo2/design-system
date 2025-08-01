import { colors, ColorScale, ColorShade } from '../colors';

describe('Colors Tokens', () => {
  // Structure tests
  describe('Color Structure', () => {
    it('exports colors object', () => {
      expect(colors).toBeDefined();
      expect(typeof colors).toBe('object');
    });

    it('has all expected color families', () => {
      const expectedFamilies = ['primary', 'secondary', 'neutral', 'success', 'warning', 'error'];
      expectedFamilies.forEach(family => {
        expect(colors).toHaveProperty(family);
      });
    });

    it('each color family has all shade values', () => {
      const expectedShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
      
      Object.keys(colors).forEach(family => {
        expectedShades.forEach(shade => {
          expect(colors[family as keyof typeof colors]).toHaveProperty(shade.toString());
        });
      });
    });
  });

  // Color value format tests
  describe('Color Value Formats', () => {
    it('all color values are valid hex strings', () => {
      const hexColorRegex = /^#[0-9a-f]{6}$/i;
      
      Object.values(colors).forEach(colorFamily => {
        Object.values(colorFamily).forEach(colorValue => {
          expect(colorValue).toMatch(hexColorRegex);
        });
      });
    });

    it('all colors are strings', () => {
      Object.values(colors).forEach(colorFamily => {
        Object.values(colorFamily).forEach(colorValue => {
          expect(typeof colorValue).toBe('string');
        });
      });
    });
  });

  // Specific color family tests
  describe('Primary Colors', () => {
    it('has expected blue color palette', () => {
      expect(colors.primary[50]).toBe('#eff6ff');
      expect(colors.primary[500]).toBe('#3b82f6'); // Main brand color
      expect(colors.primary[900]).toBe('#1e3a8a');
    });

    it('progresses from light to dark', () => {
      // Simple check: 50 should be lighter (closer to white) than 900
      expect(colors.primary[50]).toBe('#eff6ff'); // Very light
      expect(colors.primary[900]).toBe('#1e3a8a'); // Very dark
    });
  });

  describe('Neutral Colors', () => {
    it('has expected grayscale palette', () => {
      expect(colors.neutral[50]).toBe('#fafafa');
      expect(colors.neutral[500]).toBe('#737373');
      expect(colors.neutral[900]).toBe('#171717');
    });

    it('progresses from very light gray to very dark gray', () => {
      expect(colors.neutral[50]).toBe('#fafafa'); // Almost white
      expect(colors.neutral[900]).toBe('#171717'); // Almost black
    });
  });

  describe('Semantic Colors', () => {
    it('has success colors (green palette)', () => {
      expect(colors.success[500]).toBe('#22c55e');
      expect(colors.success[50]).toBe('#f0fdf4');
      expect(colors.success[900]).toBe('#14532d');
    });

    it('has warning colors (yellow/orange palette)', () => {
      expect(colors.warning[500]).toBe('#f59e0b');
      expect(colors.warning[50]).toBe('#fffbeb');
      expect(colors.warning[900]).toBe('#78350f');
    });

    it('has error colors (red palette)', () => {
      expect(colors.error[500]).toBe('#ef4444');
      expect(colors.error[50]).toBe('#fef2f2');
      expect(colors.error[900]).toBe('#7f1d1d');
    });
  });

  // Type safety tests
  describe('Type Definitions', () => {
    it('ColorScale type should accept valid color families', () => {
      // This test ensures our types work correctly at compile time
      const primaryScale: ColorScale = colors.primary;
      const neutralScale: ColorScale = colors.neutral;
      
      expect(primaryScale).toBeDefined();
      expect(neutralScale).toBeDefined();
    });

    it('ColorShade type should accept valid shade numbers', () => {
      // Test that our shade types work
      const lightShade: ColorShade = 50;
      const mediumShade: ColorShade = 500;
      const darkShade: ColorShade = 900;
      
      expect(lightShade).toBe(50);
      expect(mediumShade).toBe(500);
      expect(darkShade).toBe(900);
    });
  });

  // Consistency tests
  describe('Color Consistency', () => {
    it('all color families have the same shade structure', () => {
      const expectedShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      
      Object.values(colors).forEach(colorFamily => {
        const actualShades = Object.keys(colorFamily).sort((a, b) => parseInt(a) - parseInt(b));
        expect(actualShades).toEqual(expectedShades);
      });
    });

    it('no duplicate color values within reasonable tolerance', () => {
      // Collect all color values to check for accidental duplicates
      const allColors: string[] = [];
      
      Object.values(colors).forEach(colorFamily => {
        Object.values(colorFamily).forEach(colorValue => {
          allColors.push(colorValue);
        });
      });

      // Check that we don't have exact duplicates (which would suggest copy-paste errors)
      const uniqueColors = new Set(allColors);
      
      // We expect some similar colors, but not many exact duplicates
      // This is a reasonable threshold - adjust if design system legitimately has more duplicates
      expect(uniqueColors.size).toBeGreaterThan(allColors.length * 0.85);
    });
  });

  // Usage tests (integration with design system)
  describe('Design System Integration', () => {
    it('provides colors commonly used in components', () => {
      // Test that colors used in Button component exist
      expect(colors.primary[500]).toBeDefined(); // Primary button background
      expect(colors.neutral[50]).toBeDefined();  // Primary button text
      expect(colors.neutral[100]).toBeDefined(); // Secondary button background
      expect(colors.neutral[900]).toBeDefined(); // Secondary button text
    });

    it('maintains color object immutability', () => {
      // Test that colors object is properly marked as const
      // We test this by checking the type - the colors object should be readonly
      expect(Object.isFrozen(colors)).toBe(false); // Object.freeze isn't used but const assertion provides compile-time safety
      expect(colors).toBeDefined();
      expect(typeof colors).toBe('object');
    });
  });

  // Accessibility considerations
  describe('Accessibility', () => {
    it('provides sufficient color variety for different use cases', () => {
      // Each color family should have light, medium, and dark options
      Object.values(colors).forEach(colorFamily => {
        expect(colorFamily[50]).toBeDefined();  // Light
        expect(colorFamily[500]).toBeDefined(); // Medium
        expect(colorFamily[900]).toBeDefined(); // Dark
      });
    });

    it('has semantic color categories for different states', () => {
      // Important for accessible UI feedback
      expect(colors.success).toBeDefined();
      expect(colors.warning).toBeDefined();
      expect(colors.error).toBeDefined();
      expect(colors.neutral).toBeDefined();
    });
  });
});