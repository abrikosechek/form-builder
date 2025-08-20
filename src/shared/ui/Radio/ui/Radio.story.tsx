import { Meta, StoryObj } from '@storybook/react/*'
import { useState } from 'react'
import { Radio } from './Radio'
import { RadioItem } from './RadioItem'

// name: string
// title?: string
// children: ReactNode
// value?: string | null | undefined
// onChange?: (e: string) => void

const meta = {
  title: 'Radio',
  component: Radio,
  argTypes: {
    name: { control: 'text' },
    title: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    name: 'radio',
    title: null,
  },
} satisfies Meta<typeof Radio>
export default meta

type Story = StoryObj<typeof Radio>

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('')

    const options = ['first', 'second', 'third']

    return (
      <>
        <Radio
          {...args}
          name="radio"
          value={value}
          onChange={(e) => {
            setValue(e)
            args.onChange?.(e)
          }}
        >
          {options.map((option) => (
            <RadioItem value={option}>{option}</RadioItem>
          ))}
        </Radio>
        <p>Choosed option: {value}</p>
      </>
    )
  },
}

export const Default: Story = {
  ...Template,
}
