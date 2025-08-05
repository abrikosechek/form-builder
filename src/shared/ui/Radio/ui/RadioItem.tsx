import styles from './RadioItem.module.scss'
import { RadioGroup } from 'radix-ui'

interface Props {
  value?: any
  label?: string
  disabled?: boolean
}

export const RadioItem = ({ value, label, disabled = false }: Props) => {
  return (
    <label className={styles.label}>
      <RadioGroup.Item
        className={styles.radioItem}
        value={value}
        disabled={disabled}
      >
        <RadioGroup.Indicator className={styles.radioItem__indicator} />
      </RadioGroup.Item>

      <p className={styles.label__text}>{label || value}</p>
    </label>
  )
}
