import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { type ComponentProps, useEffect, useState } from 'react'

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    onChange: { action: 'changed' },
    label: { control: 'text' },
  },
  args: {
    checked: false,
  },
} satisfies Meta<typeof Checkbox>
export default meta

type Story = StoryObj<typeof Checkbox>
const Template = (args: ComponentProps<typeof Checkbox>) => {
  const [value, setValue] = useState(args.checked)

  useEffect(() => {
    setValue(args.checked)
  }, [args.checked])

  return (
    <Checkbox
      {...args}
      checked={value}
      onChange={(e) => {
        setValue(e)
        args.onChange?.(e)
      }}
    />
  )
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    checked: true,
  },
}
