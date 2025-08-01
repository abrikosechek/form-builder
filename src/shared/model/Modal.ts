import { create } from 'zustand'

type Modal = {
  el: string
  data?: any
}

interface ModalStore {
  modal: Modal | null
  setModal: (newModal: Modal | null) => void
}

export const useModalStore = create<ModalStore>()((set) => ({
  modal: null,
  setModal: (newModal) => set({ modal: newModal }),
}))
