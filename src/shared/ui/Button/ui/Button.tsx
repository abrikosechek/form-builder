import styles from './Button.module.scss'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  wide?: boolean
}

export const Button = ({ children, wide = false }: Props) => {
  return (
    <button className={`${styles.button} ${wide ? styles.wide : ''}`}>
      {children}
    </button>
  )
}
