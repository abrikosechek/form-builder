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
  options: string[]
  params: {
    label?: string
    value?: string
  }
}
export type InputSelect = {
  type: 'select'
  options: string[]
  params: {
    value?: string
  }
}

export type TInput = {
  id: string
} & (InputText | InputCheckbox | InputRadio | InputSelect)
