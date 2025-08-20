import styles from './SelectItem.module.scss'
import { ReactNode } from 'react'
import { DropdownMenu } from 'radix-ui'

interface Props {
  value: string
  children?: ReactNode
}

export const SelectItem = ({ value, children }: Props) => {
  return (
    <DropdownMenu.RadioItem className={styles.selectItem} value={value}>
      <p>{children}</p>
    </DropdownMenu.RadioItem>
  )
}
