import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.story.@(js|jsx|ts|tsx|mdx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  addons: ['@storybook/addon-themes'],
}

export default config
