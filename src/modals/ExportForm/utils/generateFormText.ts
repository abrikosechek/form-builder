import { TInput } from '@/shared/types/inputs'

const generateInputText = (inputId: string, inputObject: TInput): string => {
  switch (inputObject.type) {
    case 'input':
      return `<input name="${inputId}" value="${inputObject.params.value}" placeholder="${inputObject.params.placeholder}" />`
    case 'checkbox':
      return `<label>
  <input type="checkbox" name="${inputId}" ${inputObject.params.value ? 'checked' : ''} /> ${inputObject.params.label}
</label>`
    case 'radio':
      return `<fieldset>
  <legend>${inputObject.params.label}</legend>
  ${inputObject.options.map(
    (option) =>
      `\n  <label><input type="radio" name="${inputId}" value="${option}" ${inputObject.params.value === option ? 'checked' : ''} /> ${option}</label>`
  )}
</fieldset>`
    case 'select':
      return `<select name="${inputId}">
  <option value="">Select</option>
  ${inputObject.options.map(
    (option) =>
      `\n  <option value="${option}" ${inputObject.params.value === option ? 'selected' : ''}>${option}</option>`
  )}
</select>`
    default:
      return `<p>Input type not found (${inputId})</p>`
  }
}

export const generateFormText = (
  inputs: Array<{ id: string; input: TInput }>
): string => {
  let inputsString = ``

  inputs.forEach((input, index) => {
    inputsString =
      inputsString +
      (index > 0 ? `\n` : '') +
      generateInputText(input.id, input.input)
  })

  return `<form>
${inputsString}
</form>`
}
