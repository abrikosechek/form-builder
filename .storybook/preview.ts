import '../src/app/styles/main.scss'
import type { Preview, Parameters } from '@storybook/react'

export const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '$on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const parameters = {}
