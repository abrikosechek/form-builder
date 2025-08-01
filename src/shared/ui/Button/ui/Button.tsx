import styles from './Button.module.scss'
import type { MouseEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  wide?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => any
  color?: 'primary' | 'success' | 'grey'
}

export const Button = ({
  children,
  wide = false,
  color = 'primary',
  onClick,
}: Props) => {
  return (
    <button
      className={`${styles.button} ${wide ? styles.wide : ''} ${styles[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
