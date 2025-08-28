import { z } from 'zod'

// Input types
export const ZInputTypes = z.enum(['input', 'checkbox', 'radio', 'select'])
export type InputTypes = z.infer<typeof ZInputTypes>

// Input options
export const ZInputOptions = z.array(z.string())
export type InputOptions = z.infer<typeof ZInputOptions>

// Input params map schemas
export const ZInputParamsMap = {
  input: z.object({
    placeholder: z.string(),
    value: z.string(),
  }),
  checkbox: z.object({
    label: z.string(),
    value: z.boolean(),
  }),
  radio: z.object({
    label: z.string(),
    value: z.string(),
  }),
  select: z.object({
    value: z.string(),
  }),
}
export type InputParamsMap = {
  input: z.infer<typeof ZInputParamsMap.input>
  checkbox: z.infer<typeof ZInputParamsMap.checkbox>
  radio: z.infer<typeof ZInputParamsMap.radio>
  select: z.infer<typeof ZInputParamsMap.select>
}

// Base input schema
export const ZBaseInput = <T extends InputTypes>(type: T) =>
  z.object({
    type: z.literal(type),
    params: ZInputParamsMap[type],
  })

// Individual input schemas
export const ZInputText = ZBaseInput('input')
export type InputText = z.infer<typeof ZInputText>

export const ZInputCheckbox = ZBaseInput('checkbox')
export type InputCheckbox = z.infer<typeof ZInputCheckbox>

export const ZInputRadio = ZBaseInput('radio').extend({
  options: ZInputOptions,
})
export type InputRadio = z.infer<typeof ZInputRadio>

export const ZInputSelect = ZBaseInput('select').extend({
  options: ZInputOptions,
})
export type InputSelect = z.infer<typeof ZInputSelect>

// Union type for all inputs
export const ZTInput = z.discriminatedUnion('type', [
  ZInputText,
  ZInputCheckbox,
  ZInputRadio,
  ZInputSelect,
])
export type TInput = z.infer<typeof ZTInput>

export const inputHasOptions = (
  input: TInput
): input is InputRadio | InputSelect => {
  return input.type === 'radio' || input.type === 'select'
}
