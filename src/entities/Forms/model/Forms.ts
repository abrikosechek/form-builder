import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { InputTypes, TInput } from '@/shared/types/inputs'

type Form = {
  name: string
  inputs: TInput[]
}

const localStorageName = 'forms'

type State = {
  forms: Form[]
}
type Action = {
  getForms: () => void
  createForm: (formName: string) => void
  addInput: (formName: string, inputId: string, inputType: InputTypes) => void
  removeInput: (formName: string, inputId: string) => void
}

export const useFormsStore = create<State & Action>()(
  immer((set) => ({
    forms: [],
    getForms: () =>
      set((state) => {
        const forms = localStorage.getItem(localStorageName)
        const parsedForms = forms ? JSON.parse(forms) : []

        state.forms = parsedForms
      }),
    createForm: (formName) =>
      set((state) => {
        if (state.forms.some((form) => form.name === formName)) {
          console.error('Form with this name already exists!')
          return
        }

        const newFormsList = [
          ...state.forms,
          {
            name: formName,
            inputs: [],
          },
        ]

        state.forms = newFormsList
        localStorage.setItem(localStorageName, JSON.stringify(state.forms))
      }),
    addInput: (formName, inputId, inputType) =>
      set((state) => {
        const formToUpdate = state.forms.find((form) => form.name === formName)

        if (!formToUpdate) {
          console.error('No such form')
          return
        }
        if (formToUpdate.inputs.some((input) => input.id === inputId)) {
          console.error('Input with this id already exists!')
          return
        }

        let inputToAdd: TInput

        if (inputType === 'radio' || inputType === 'select') {
          inputToAdd = {
            id: inputId,
            type: inputType,
            options: ['Option'],
            params: {},
          }
        } else {
          inputToAdd = {
            id: inputId,
            type: inputType,
            params: {},
          }
        }

        formToUpdate.inputs.push(inputToAdd)
        localStorage.setItem(localStorageName, JSON.stringify(state.forms))
      }),
    removeInput: (formName, inputId) =>
      set((state) => {
        const formToUpdate = state.forms.find((form) => form.name === formName)
        const inputIndex = formToUpdate?.inputs.findIndex(
          (input) => input.id === inputId
        )
        console.log(inputIndex)

        if (!formToUpdate || inputIndex === undefined || inputIndex === -1) {
          console.error('No such form or input!')
          return
        }

        formToUpdate.inputs.splice(inputIndex, 1)
        localStorage.setItem(localStorageName, JSON.stringify(state.forms))
      }),
  }))
)
