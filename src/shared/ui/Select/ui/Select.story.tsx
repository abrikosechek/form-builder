import type { Meta, StoryObj } from '@storybook/react'
import { useState, type ComponentProps } from 'react'
import { Select } from './Select'

const meta = {
  title: 'Select',
  component: Select,
} satisfies Meta<typeof Select>
export default meta

type Story = StoryObj<ComponentProps<typeof Select>>

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('')

    return (
      <>
        <p style={{ marginBottom: 10 }}>Choosed value: {value}</p>
        <Select {...args} value={value} onChange={(e) => setValue(e)} />
      </>
    )
  },
}

export const Default: Story = {
  ...Template,
  args: {
    options: [
      {
        value: 'Option 1',
      },
      {
        value: 'Option 2',
      },
      {
        value: 'Option 3',
      },
    ],
  },
}
