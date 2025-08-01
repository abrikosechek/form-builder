import { ReactNode } from 'react'
import { create } from 'zustand'

type Modal = {
  title: string
  el: ReactNode
}

interface ModalStore {
  modal: Modal | null
  setModal: (newModal: Modal | null) => void
}

export const useModalStore = create<ModalStore>()((set) => ({
  modal: null,
  setModal: (newModal) => set({ modal: newModal }),
}))
