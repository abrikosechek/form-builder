import { ReactNode } from 'react'
import { create } from 'zustand'

type Modal = {
  el: ReactNode
}

type State = {
  modal: Modal | null
}
type Action = {
  setModal: (newModal: Modal | null) => void
}

export const useModalStore = create<State & Action>()((set) => ({
  modal: null,
  setModal: (newModal) => set({ modal: newModal }),
}))
