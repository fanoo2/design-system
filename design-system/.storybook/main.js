
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  core: {
    builder: 'webpack5'
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },

  docs: {
    autodocs: true
  }
};
