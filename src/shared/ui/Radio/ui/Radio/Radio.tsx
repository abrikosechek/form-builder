import inputStyles from '@/shared/styles/inputs.module.scss'
import styles from './Radio.module.scss'
import type { ReactNode } from 'react'
import { RadioGroup } from 'radix-ui'

interface Props {
  name?: string
  label?: string | null
  children?: ReactNode
  value?: string | null | undefined
  disabled?: boolean
  onChange?: (e: string) => void
}

export const Radio = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  children,
}: Props) => {
  return (
    <div className={`${styles.radioContainer} ${inputStyles.input}`}>
      {label && <p className={styles.title}>{label}</p>}

      <RadioGroup.Root
        className={styles.radioGroup}
        name={name}
        value={value}
        onValueChange={(e) => (onChange ? onChange(e) : null)}
        disabled={disabled}
      >
        {children}
      </RadioGroup.Root>
    </div>
  )
}
