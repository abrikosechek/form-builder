import styles from './ComponentCard.module.scss'
import { PlusIcon, StackIcon } from '@radix-ui/react-icons'
import type { MouseEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  name: string
  onClick?: (event: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
}

export const ComponentCard = ({ children, name, onClick }: Props) => {
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
