import styles from './RadioItem.module.scss'
import { RadioGroup } from 'radix-ui'

interface Props {
  value: any
  label?: string
}

export const RadioItem = ({ value, label }: Props) => {
  return (
    <label className={styles.label}>
      <RadioGroup.Item className={styles.radioItem} value={value}>
        <RadioGroup.Indicator className={styles.radioItem__indicator} />
      </RadioGroup.Item>

      <p className={styles.label__text}>{label || value}</p>
    </label>
  )
}
