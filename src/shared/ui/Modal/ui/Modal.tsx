import styles from './Modal.module.scss'
import { useModalStore } from '@/shared/model/Modal'
import { Cross1Icon } from '@radix-ui/react-icons'
import { MouseEvent, ReactNode, useCallback } from 'react'

interface Props {
  children: ReactNode
}

export const Modal = ({ children }: Props) => {
  const setModal = useModalStore((state) => state.setModal)

  const closeModal = useCallback(() => {
    setModal(null)
  }, [])

  const handleRootClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // Only runs when clicking the parent, not children
      closeModal()
    }
  }

  return (
    <div className={styles.modalRoot} onClick={handleRootClick}>
      <div className={`${styles.modal} container`}>
        <div className={styles.modal__header}>
          <p className={styles.modal__title}>Registration</p>
          <button
            className={styles.modal__closeButton}
            onClick={() => closeModal()}
          >
            <Cross1Icon />
          </button>
        </div>

        <div className={`${styles.modal__content}`}>{children}</div>
      </div>
    </div>
  )
}
