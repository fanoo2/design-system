
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
    reactDocgen: 'react-docgen-typescript',
    check: false
  },

  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
    ]
  }),

  docs: {
    autodocs: true
  }
};
