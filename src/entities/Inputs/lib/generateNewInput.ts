import { InputTypes, TInput } from '@/shared/types/inputs'

export const generateNewInput = (inputType: InputTypes): TInput | undefined => {
  switch (inputType) {
    case 'input':
      return {
        type: inputType,
        params: { placeholder: '', value: '' },
      }
    case 'checkbox':
      return {
        type: inputType,
        params: { label: '', value: false },
      }
    case 'radio':
      return {
        type: inputType,
        options: ['Option'],
        params: { label: '', value: '' },
      }
    case 'select':
      return {
        type: inputType,
        options: ['Option'],
        params: { value: '' },
      }
    default:
      return undefined
  }
}
