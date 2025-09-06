import { create } from 'zustand'
import type { Form, Forms } from '../types'
import { useInputsStore } from '@/entities/Inputs/@x/Forms'
import { createComputed } from 'zustand-computed'

type State = {
  forms: Forms
  formsOrder: string[]
}

type Actions = {
  loadForms: () => void
  saveForms: () => void
  createForm: (formId: string) => Form
}

type Store = State & Actions

type Computed = {
  orderedForms: () => Array<[string, Form]>
  formById: (formId: string) => Form | undefined
}

const computed = createComputed(
  (state: Store): Computed => ({
    orderedForms: () =>
      state.formsOrder.map((formId) => [formId, state.forms[formId]]),

    formById: (formId) => state.forms[formId],
  })
)

export const useFormsStore = create<Store>()(
  computed((set, get) => ({
    // STATES
    forms: {},
    formsOrder: [],

    // ACTIONS
    loadForms: () => {
      const forms = localStorage.getItem('forms')
      const formsOrder = localStorage.getItem('formsOrder')

      if (forms && formsOrder) {
        try {
          const parsedForms = JSON.parse(forms)
          const parsedFormsOrder = JSON.parse(formsOrder)

          set({
            forms: parsedForms,
            formsOrder: parsedFormsOrder,
          })
        } catch (error) {
          console.error('Failed to parse forms or formsOrder from localStorage')
        }
      }
    },

    saveForms: () => {
      const state = get()
      localStorage.setItem('forms', JSON.stringify(state.forms))
      localStorage.setItem('formsOrder', JSON.stringify(state.formsOrder))
    },

    createForm: (formId) => {
      const state = get()

      if (formId in state.forms)
        throw new Error(`Form with this id "${formId}" exists`)

      const newForm: Form = {
        inputs: {},
        inputsOrder: [],
      }

      set({
        forms: {
          ...state.forms,
          [formId]: newForm,
        },
        formsOrder: [...state.formsOrder, formId],
      })
      get().saveForms()

      const { createInputsObject } = useInputsStore.getState()
      createInputsObject(formId)

      return newForm
    },
  }))
)
