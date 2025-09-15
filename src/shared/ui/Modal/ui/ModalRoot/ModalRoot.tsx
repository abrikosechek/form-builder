import styles from './ModalRoot.module.scss'
import { useModalStore } from '@/shared/model'
import { MouseEvent, ReactNode, RefObject, useRef } from 'react'

interface Props {
  children: ReactNode
  ref?: RefObject<HTMLDivElement | null>
}

export const ModalRoot = ({ children, ref }: Props) => {
  const setModal = useModalStore((state) => state.setModal)

  const handleRootClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModal(null)
    }
  }

  return (
    <div ref={ref} className={styles['modal-root']} onClick={handleRootClick}>
      {children}
    </div>
  )
}
