import styles from './ModalRoot.module.scss'
import { useModalStore } from '@/shared/model/Modal'
import { MouseEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const ModalRoot = ({ children }: Props) => {
  const setModal = useModalStore((state) => state.setModal)

  const handleRootClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModal(null)
    }
  }

  return (
    <div className={styles.modalRoot} onClick={handleRootClick}>
      {children}
    </div>
  )
}
