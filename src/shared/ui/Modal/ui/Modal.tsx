import styles from './Modal.module.scss'
import { useModalStore } from '@/shared/model/Modal'
import { Cross1Icon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

export const Modal = ({ children, title }: Props) => {
  const setModal = useModalStore((state) => state.setModal)

  return (
    <div className={`${styles.modal} container`}>
      <div className={styles.modal__header}>
        <p className={styles.modal__title}>{title}</p>
        <button
          className={styles.modal__closeButton}
          onClick={() => setModal(null)}
        >
          <Cross1Icon />
        </button>
      </div>

      <div className={`${styles.modal__content}`}>{children}</div>
    </div>
  )
}
