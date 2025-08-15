import { create } from 'zustand'

export type Input = {
  type: any
  params: any
}

export type Form = {
  name: string
  inputs: Input[]
}

interface FormsStore {
  forms: Form[]
  getForms: () => void
  createForm: (formName: string) => void
}

export const useFormsStore = create<FormsStore>()((set) => ({
  forms: [],
  getForms: () =>
    set(() => {
      const forms = localStorage.getItem('forms')
      const parsedForms = forms ? JSON.parse(forms) : []

      return { forms: parsedForms }
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

      return { forms: newFormsList }
    }),
}))
