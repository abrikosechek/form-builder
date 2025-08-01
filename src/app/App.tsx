import './styles/main.scss'
import { MainProviders } from './MainProviders'
import { useModalStore } from '@/shared/model/Modal'
import { ModalRoot } from '@/shared/ui/Modal'

const App = () => {
  const modal = useModalStore((state) => state.modal)

  return (
    <>
      <MainProviders />

      {modal && <ModalRoot>{modal.el}</ModalRoot>}
    </>
  )
}

export default App
