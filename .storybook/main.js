
module.exports = {
  stories: ['../design-system/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: { builder: 'webpack5' },
};
