import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { ComponentProps, useState } from 'react'

const meta = {
  title: 'Input',
  component: Input,
} satisfies Meta<typeof Input>
export default meta

type Story = StoryObj<ComponentProps<typeof Input>>
const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState('')

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const Default: Story = {
  ...Template,
}

export const Placeholder: Story = {
  ...Template,
  args: {
    placeholder: 'Placeholder text',
  },
}
