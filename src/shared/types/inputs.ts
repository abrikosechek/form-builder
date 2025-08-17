export type InputTypes = 'input' | 'checkbox' | 'radio' | 'select'

export type InputText = {
  type: 'input'
  params: {
    placeholder?: string
    value?: string
  }
}
export type InputCheckbox = {
  type: 'checkbox'
  params: {
    label?: string
    value?: boolean
  }
}
export type InputRadio = {
  type: 'radio'
  params: {
    label?: string
    value?: string
    items: string[]
  }
}
export type InputSelect = {
  type: 'select'
  params: {
    value?: string
    items: string[]
  }
}

export type TInput = {
  id: string
} & (InputText | InputCheckbox | InputRadio | InputSelect)
