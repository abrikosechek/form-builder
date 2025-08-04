import { Component1Icon, PlusIcon } from '@radix-ui/react-icons'
import styles from './ComponentCard.module.scss'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  name: string
}

export const ComponentCard = ({ children, name }: Props) => {
  return (
    <div className={styles.componentCard}>
      <button className={styles.componentCard__buttonAdd}>
        <PlusIcon />
      </button>

      <div className={styles.componentCard__icon}>
        <Component1Icon />
      </div>

      <p className={styles.componentCard__name}>&lt;{name} /&gt;</p>

      <div className={styles.componentCard__content}>{children}</div>
    </div>
  )
}
