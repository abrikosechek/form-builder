import styles from './InputComponentCard.module.scss'
import type { MouseEvent, ReactNode } from 'react'
import { PlusIcon, StackIcon } from '@radix-ui/react-icons'

interface Props {
  name: string
  onClick?: (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
  children: ReactNode
}

export const InputComponentCard = ({ name, onClick, children }: Props) => {
  return (
    <div className={styles.componentCard} onClick={onClick}>
      <button className={styles.componentCard__buttonAdd} onClick={onClick}>
        <PlusIcon />
      </button>
      <div className={styles.componentCard__icon}>
        <StackIcon />
      </div>
      <p className={styles.componentCard__name}>&lt;{name} /&gt;</p>

      <div className={styles.componentCard__content}>{children}</div>
    </div>
  )
}
