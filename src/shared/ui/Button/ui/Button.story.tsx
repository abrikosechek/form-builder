import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'
import { PlusIcon } from '@radix-ui/react-icons'

const meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    wide: { control: 'boolean' },
    color: { control: 'radio', options: ['primary', 'success', 'grey'] },
  },
  args: {
    wide: false,
    color: 'primary',
  },
} satisfies Meta<typeof Button>
export default meta

type Story = StoryObj<typeof Button>
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

export const Icon: Story = {
  render: (args) => (
    <Button {...args}>
      <PlusIcon />
    </Button>
  ),
}
