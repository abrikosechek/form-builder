import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { useEffect, useState } from 'react'

const meta = {
  title: 'Input',
  component: Input,
  argTypes: {
    placeholder: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    onChange: {
      action: 'changed',
    },
  },
  args: {
    value: '',
    placeholder: '',
  },
} satisfies Meta<typeof Input>
export default meta

type Story = StoryObj<typeof Input>
const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(args.value || '')

    useEffect(() => {
      setValue(args.value)
    }, [args.value])

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
}

export const Default: Story = {
  ...Template,
}
