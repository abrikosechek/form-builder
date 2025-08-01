import { Meta, StoryObj } from '@storybook/react/*'
import { Radio } from './Radio'
import { RadioItem } from './RadioItem'
import { ComponentProps, useState } from 'react'

const meta = {
  title: 'Radio',
  component: Radio,
} satisfies Meta<typeof Radio>
export default meta

type Story = StoryObj<ComponentProps<typeof Radio>>

const Template: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('')

    return (
      <>
        <Radio
          {...args}
          name="radio"
          value={value}
          onChange={(e) => setValue(e)}
        >
          <RadioItem value={'first'} />
          <RadioItem value={'second'} />
          <RadioItem value={'third'} />
        </Radio>
        <p>Choosed option: {value}</p>
      </>
    )
  },
}

export const Default: Story = {
  ...Template,
}

export const Title: Story = {
  ...Template,
  args: {
    title: 'Radio input title',
  },
}

export const Label: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')
    const [labelPrefix, setLabelPrefix] = useState<string>('')

    return (
      <>
        <p>Label prefix:</p>
        <input
          type="text"
          placeholder="type here..."
          value={labelPrefix}
          onChange={(e) => setLabelPrefix(e.target.value)}
        />

        <Radio name="radio" value={value} onChange={(e) => setValue(e)}>
          <RadioItem value={'first'} label={`${labelPrefix}first`} />
          <RadioItem value={'second'} label={`${labelPrefix}second`} />
          <RadioItem value={'third'} label={`${labelPrefix}third`} />
        </Radio>
        <p>Choosed option: {value}</p>
      </>
    )
  },
  args: {
    title: 'Radio input title',
  },
}
