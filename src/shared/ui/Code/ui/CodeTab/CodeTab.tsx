import styles from './CodeTab.module.scss'
import React from 'react'

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children?: React.ReactNode
  active?: boolean
}

export const CodeTab = ({ onClick, children, active = false }: Props) => {
  return (
    <button
      className={`${styles['code-tab']} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
