import { create } from 'zustand'
import { createComputed } from 'zustand-computed'
import { generateNewInput } from '../lib'
import { InputTypes, TInput } from '@/shared/types/inputs'

type State = {
  inputs: Record<
    string,
    {
      inputsOrder: string[]
      inputs: Record<string, TInput>
    }
  >
}

type Actions = {
  loadInputs: () => void
  saveInputs: () => void
  createInputsObject: (formId: string) => void
  deleteInputsObject: (formId: string) => void
  addInput: (formId: string, inputId: string, inputType: InputTypes) => TInput
  removeInput: (formId: string, inputId: string) => void
  editInput: (
    formId: string,
    inputId: string,
    newInputId: string,
    newInput: TInput
  ) => void
}

type Store = State & Actions

type Computed = {
  inputsByForm: (formId: string) => Array<[string, TInput]> | undefined
  inputById: (formId: string, inputId: string) => TInput | undefined
}

const computed = createComputed(
  (state: Store): Computed => ({
    inputsByForm: (formId) => {
      const formInputs = state.inputs[formId]
      const formInputsList = formInputs?.inputs

      if (!formInputs) return undefined

      return formInputs.inputsOrder.map((inputId) => [
        inputId,
        formInputsList[inputId],
      ])
    },

    inputById: (formId, inputId) => state.inputs[formId]?.inputs[inputId],
  })
)

export const useInputsStore = create<Store>()(
  computed((set, get) => ({
    // STATES
    inputs: {},

    // ACTIONS
    loadInputs: () => {
      const inputs = localStorage.getItem('inputs')

      if (inputs) {
        try {
          const parsedInputs = JSON.parse(inputs)

          set({
            inputs: parsedInputs,
          })
        } catch (error) {
          console.error('Failed to parse inputs from localStorage')
        }
      }
    },

    saveInputs: () => {
      const state = get()
      localStorage.setItem('inputs', JSON.stringify(state.inputs))
    },

    createInputsObject: (formId) => {
      const state = get()

      set({
        inputs: {
          ...state.inputs,
          [formId]: {
            inputs: {},
            inputsOrder: [],
          },
        },
      })
    },

    deleteInputsObject: (formId) => {
      const state = get()

      let inputs = { ...state.inputs }
      delete inputs[formId]

      set({
        inputs,
      })
    },

    addInput: (formId, inputId, inputType) => {
      const state = get()
      const formInputs = state.inputs[formId]
      const inputToAdd = generateNewInput(inputType)

      if (inputToAdd === undefined) {
        throw new Error(`Unknown input type: "${inputType}"`)
      }

      if (!formInputs)
        throw new Error(`Form with id "${formId}" does not exist`)
      if (formInputs.inputs[inputId])
        throw new Error(`Input with id "${formId}" already exists`)

      set({
        inputs: {
          ...state.inputs,
          [formId]: {
            ...formInputs,
            inputs: {
              ...formInputs.inputs,
              [inputId]: inputToAdd,
            },
            inputsOrder: [...formInputs.inputsOrder, inputId],
          },
        },
      })

      get().saveInputs()
      return inputToAdd
    },

    removeInput: (formId, inputId) => {
      const state = get()
      const formInputs = state.inputs[formId]

      if (!formInputs)
        throw new Error(`Form with id "${formId}" does not exist`)
      if (!formInputs.inputs[inputId])
        throw new Error(`Input with id "${formId}" already exists`)

      let newInputsList = { ...formInputs.inputs }
      delete newInputsList[inputId]

      let newInputsOrder = formInputs.inputsOrder.filter(
        (input) => input !== inputId
      )

      set({
        inputs: {
          ...state.inputs,
          [formId]: {
            ...formInputs,
            inputs: newInputsList,
            inputsOrder: newInputsOrder,
          },
        },
      })
      get().saveInputs()
    },

    editInput: (formId, inputId, newInputId, newInput) => {
      const state = get()
      const formInputs = state.inputs[formId]

      if (!formInputs)
        throw new Error(`Form with id "${formId}" does not exist`)
      if (!formInputs.inputs[inputId])
        throw new Error(`Input with id "${formId}" already exists`)
      if (inputId !== newInputId && formInputs.inputs[inputId])
        throw new Error(`Input with id "${newInputId}" already exists!`)

      const { [inputId]: input, ...otherInputs } = formInputs.inputs

      set({
        inputs: {
          ...state.inputs,
          [formId]: {
            ...formInputs,
            inputs: {
              ...otherInputs,
              [newInputId]: newInput,
            },
          },
        },
      })
      get().saveInputs()
    },
  }))
)
