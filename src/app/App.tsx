import './styles/main.scss'
import { MainProviders } from './MainProviders'
import { useModalStore } from '@/shared/model/Modal'
import { Modal } from '@/shared/ui/Modal/ui/Modal'

const App = () => {
  const modal = useModalStore((state) => state.modal)

  return (
    <>
      <MainProviders />

      {modal && <Modal>{modal.el}</Modal>}
    </>
  )
}

export default App
