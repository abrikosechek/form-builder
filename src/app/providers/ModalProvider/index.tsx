import { useModalStore } from '@/shared/model/Modal'
import { ModalRoot } from '@/shared/ui/Modal'

export const ModalProvider = () => {
  const modal = useModalStore((state) => state.modal)

  return <>{modal && <ModalRoot>{modal.el}</ModalRoot>}</>
}
