import styles from './Button.module.scss'
import type { MouseEvent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  wide?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => any
  color?: 'primary' | 'success' | 'grey'
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  wide = false,
  color = 'primary',
  type,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${wide ? styles.wide : ''} ${styles[color]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
