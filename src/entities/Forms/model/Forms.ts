import { create } from 'zustand'
import { type InputTypes, type TInput } from '@/shared/types/inputs'

// HELPERS CODE
const localStorageName = 'forms'

type Form = {
  inputs: Record<string, TInput>
}
type Forms = Record<string, Form>

function generateNewInput(inputType: InputTypes): TInput | undefined {
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

// STATE-MANAGER
type State = {
  forms: Forms
}

type Computed = {
  formById: (formId: string) => Form | undefined
  inputById: (formId: string, inputId: string) => TInput | undefined
}

type Action = {
  getForms: () => Forms
  saveForms: () => void
  createForm: (formId: string) => Form
  addInput: (formId: string, inputId: string, inputType: InputTypes) => TInput
  removeInput: (formId: string, inputId: string) => void
  editInput: (
    formId: string,
    inputId: string,
    newInputId: string,
    newInput: TInput
  ) => void
}

export const useFormsStore = create<State & Computed & Action>()(
  (set, get) => ({
    // states
    forms: {},

    // computed
    formById: (formId) => {
      const state = get()
      return state.forms[formId]
    },

    inputById: (formId, inputId) => {
      const state = get()
      return state.forms[formId].inputs[inputId]
    },

    // actions
    getForms: () => {
      const state = get()
      const forms = localStorage.getItem(localStorageName)
      let parsedForms: Forms = state.forms

      if (forms) {
        try {
          parsedForms = JSON.parse(forms)
        } catch (error) {
          console.error('Failed to parse forms from localStorage')
        }
      }   

      set({ forms: parsedForms })
      return parsedForms
    },

    saveForms: () => {
      const state = get()
      localStorage.setItem(localStorageName, JSON.stringify(state.forms))
    },

    createForm: (formId) => {
      const state = get()

      if (formId in state.forms)
        throw new Error(`Form with this id "${formId}" exists`)

      const newForm = {
        inputs: {},
      }

      set({
        forms: {
          ...state.forms,
          [formId]: newForm,
        },
      })
      get().saveForms()
      return newForm
    },

    addInput: (formId, inputId, inputType) => {
      const state = get()
      const form = state.forms[formId]
      const inputToAdd = generateNewInput(inputType)

      if (inputToAdd === undefined)
        throw new Error(`Unknown input type: "${inputType}"`)

      if (!form) throw new Error(`Form with id "${formId}" does not exist`)
      if (state.forms[formId].inputs[inputId])
        throw new Error(`Input with id "${formId}" already exists`)

      set({
        forms: {
          ...state.forms,
          [formId]: {
            ...form,
            inputs: {
              ...form.inputs,
              [inputId]: inputToAdd,
            },
          },
        },
      })
      get().saveForms()
      return inputToAdd
    },

    removeInput: (formId, inputId) => {
      const state = get()
      const form = state.forms[formId]

      if (!form) throw new Error('Form not found!')
      if (!form.inputs[inputId]) throw new Error('Input not found!')

      let inputs = { ...form.inputs }
      delete inputs[inputId]

      set({
        forms: {
          ...state.forms,
          [formId]: {
            ...form,
            inputs,
          },
        },
      })
      get().saveForms()
    },

    editInput: (formId, inputId, newInputId, newInput) => {
      const state = get()
      const form = state.forms[formId]

      if (!form) throw new Error('Form not found!')
      if (!form.inputs[inputId]) throw new Error('Input not found!')
      if (form.inputs[newInputId] && inputId !== newInputId)
        throw new Error(`Input with id "${newInputId}" already exists!`)

      const { [inputId]: input, ...otherInputs } = form.inputs

      set({
        forms: {
          ...state.forms,
          [formId]: {
            ...form,
            inputs: {
              ...otherInputs,
              [newInputId]: newInput,
            },
          },
        },
      })

      get().saveForms()
    },
  })
)
