import styles from './Checkbox.module.scss'
import { Switch } from 'radix-ui'

type Props = {
  label?: string
  disabled?: boolean
  checked?: boolean
  onChange?: (e: boolean) => void
}

export const Checkbox = ({
  label,
  disabled = false,
  checked,
  onChange,
}: Props) => {
  return (
    <label className={styles.label}>
      <Switch.Root
        className={styles.switch}
        checked={checked}
        onCheckedChange={(e) => onChange && onChange(e)}
        disabled={disabled}
      >
        <Switch.Thumb className={styles.switch__thumb} />
      </Switch.Root>

      {label && <p className={styles.label__text}>{label}</p>}
    </label>
  )
}
