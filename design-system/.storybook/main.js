module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  
  addons: [
    '@storybook/addon-essentials',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },

  docs: {
    autodocs: true
  }
};
