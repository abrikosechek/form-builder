import type { ReactNode } from 'react'
import type { InputTypes } from '@/shared/types/inputs'
import { Input, Checkbox, Radio, RadioItem, Select } from '@/shared/ui'

type ComponentCardItem = {
  type: InputTypes
  content: ReactNode
}

export const componentsCardsList: ComponentCardItem[] = [
  {
    type: 'input',
    content: <Input disabled />,
  },
  {
    type: 'checkbox',
    content: <Checkbox disabled />,
  },
  {
    type: 'radio',
    content: (
      <Radio disabled>
        <RadioItem disabled>Option</RadioItem>
      </Radio>
    ),
  },
  {
    type: 'select',
    content: <Select disabled />,
  },
]
