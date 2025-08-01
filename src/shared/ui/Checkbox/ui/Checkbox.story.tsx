import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { ComponentProps, useState } from 'react'

const meta = {
  title: 'Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>
export default meta

type Story = StoryObj<ComponentProps<typeof Checkbox>>
const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState(false)

    return <Checkbox {...args} checked={value} onChange={setValue} />
  },
}

export const Default: Story = {
  ...Template,
}

export const Label: Story = {
  ...Template,
  args: {
    label: "Switch me!"
  }
}
