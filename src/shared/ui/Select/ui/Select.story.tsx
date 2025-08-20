import type { Meta, StoryObj } from '@storybook/react'
import { useState, type ComponentProps } from 'react'
import { Select } from './Select'
import { SelectItem } from './SelectItem'

const meta = {
  title: 'Select',
  component: Select,
} satisfies Meta<typeof Select>
export default meta

type Story = StoryObj<ComponentProps<typeof Select>>

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('')
    const options = ['Option 1', 'Option 2', 'Option 3']

    return (
      <>
        <p style={{ marginBottom: 10 }}>Choosed value: {value}</p>
        <Select {...args} value={value} onChange={(e) => setValue(e)}>
          {options.map((option) => (
            <SelectItem value={option}>{option}</SelectItem>
          ))}
        </Select>
      </>
    )
  },
}

export const Default: Story = Template
