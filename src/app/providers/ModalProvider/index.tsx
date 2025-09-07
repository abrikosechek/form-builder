import { useModalStore } from '@/shared/model'
import { ModalRoot } from '@/shared/ui'
import { useEffect } from 'react'
import { FocusTrap } from 'focus-trap-react'

export const ModalProvider = () => {
  // zustand
  const { setModal, modal } = useModalStore()

  // close on ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModal(null)
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <>
      {modal && (
        <FocusTrap>
          <ModalRoot>{modal.el}</ModalRoot>
        </FocusTrap>
      )}
    </>
  )
}
