import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { InputTypes, TInput } from '@/shared/types/inputs'

type Form = {
  name: string
  inputs: TInput[]
}

type State = {
  forms: Form[]
}
type Action = {
  getForms: () => void
  createForm: (formName: string) => void
  addInput: (formName: string, inputId: string, inputType: InputTypes) => void
}

export const useFormsStore = create<State & Action>()(
  immer((set) => ({
    forms: [],
    getForms: () =>
      set((state) => {
        const forms = localStorage.getItem('forms')
        const parsedForms = forms ? JSON.parse(forms) : []

        state.forms = parsedForms
      }),
    createForm: (formName) =>
      set((state) => {
        const newFormsList = [
          ...state.forms,
          {
            name: formName,
            inputs: [],
          },
        ]
        localStorage.setItem('forms', JSON.stringify(newFormsList))

        state.forms = newFormsList
      }),
    addInput: (formName, inputId, inputType) =>
      set((state) => {
        const formToUpdate = state.forms.find((form) => form.name === formName)

        if (!formToUpdate) {
          console.log('No usch form')
          return
        }

        let inputToAdd: TInput

        if (inputType === 'radio' || inputType === 'select') {
          inputToAdd = {
            id: inputId,
            type: inputType,
            params: {
              items: ['any'],
            },
          }
        } else {
          inputToAdd = {
            id: inputId,
            type: inputType,
            params: {},
          }
        }

        formToUpdate.inputs.push(inputToAdd)
      }),
  }))
)
