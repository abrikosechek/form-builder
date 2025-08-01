import styles from './Button.module.scss'
import type { MouseEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  wide?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => any
}

export const Button = ({ children, wide = false, onClick }: Props) => {
  return (
    <button
      className={`${styles.button} ${wide ? styles.wide : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
