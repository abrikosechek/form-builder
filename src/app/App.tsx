import './styles/main.scss'
import { MainProviders } from './MainProviders'
import { useModalStore } from '@/shared/model/Modal'
import { Modal } from '@/shared/ui/Modal/ui/Modal'
import modals from '@/widgets/modals'
import { useCallback } from 'react'

const App = () => {
  const modal = useModalStore((state) => state.modal)

  const ModalRenderer = useCallback(() => {
    if (!modal?.el || !Object.keys(modals).includes(modal?.el))
      return <p>no such modal</p>

    const ModalComponent = modals[`${modal.el}`]
    return <ModalComponent />
  }, [modal])

  return (
    <>
      <MainProviders />

      {modal && (
        <Modal>
          <ModalRenderer />
        </Modal>
      )}
    </>
  )
}

export default App
