import { ReactNode } from 'react'
import styles from './RadioItem.module.scss'
import { RadioGroup } from 'radix-ui'

interface Props {
  value?: any
  disabled?: boolean
  children?: ReactNode
}

export const RadioItem = ({ value, disabled = false, children }: Props) => {
  return (
    <label className={styles.label}>
      <RadioGroup.Item
        className={styles['radio-item']}
        value={value}
        disabled={disabled}
      >
        <RadioGroup.Indicator className={styles['radio-item__indicator']} />
      </RadioGroup.Item>

      <p className={styles.label__text}>{children}</p>
    </label>
  )
}
