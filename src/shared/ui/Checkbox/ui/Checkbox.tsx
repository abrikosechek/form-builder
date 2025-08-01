import styles from './Checkbox.module.scss'
import { Switch } from 'radix-ui'
import type { ChangeEvent } from 'react'

interface Props {
  checked: boolean
  onChange: (e: boolean) => void
  label?: string | null
}

export const Checkbox = ({ checked, onChange, label }: Props) => {
  return (
    <label className={styles.label}>
      <Switch.Root
        className={styles.switch}
        checked={checked}
        onCheckedChange={(e) => onChange(e)}
      >
        <Switch.Thumb className={styles.switch__thumb} />
      </Switch.Root>

      {label && <p className={styles.label__text}>{label}</p>}
    </label>
  )
}
