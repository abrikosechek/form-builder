import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'
import { PlusIcon } from '@radix-ui/react-icons'
import { ComponentProps } from 'react'

const meta = {
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>
export default meta

type Story = StoryObj<ComponentProps<typeof Button>>
const Template: Story = {
  render: (args) => (
    <Button {...args}>
      <PlusIcon />
      <p>Click me!!!</p>
    </Button>
  ),
}

export const Default: Story = {
  ...Template,
}

export const Wide: Story = {
  ...Template,
  args: {
    wide: true,
  },
}

export const Icon: Story = {
  render: (args) => (
    <Button>
      <PlusIcon />
    </Button>
  ),
}
