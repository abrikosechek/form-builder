import styles from './CloseButton.module.scss'
import { type MouseEvent } from 'react'
import { ExitIcon } from '@radix-ui/react-icons'

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CloseButton = ({ onClick }: Props) => {
  return (
    <button className={styles['close-button']} onClick={onClick}>
      <ExitIcon className={styles['close-button__icon']} />
    </button>
  )
}
