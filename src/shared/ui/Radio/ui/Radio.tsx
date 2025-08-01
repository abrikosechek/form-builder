import inputStyles from '@/shared/styles/inputs.module.scss'
import styles from './Radio.module.scss'
import type { ReactNode } from 'react'
import { RadioGroup } from 'radix-ui'

interface Props {
  name: string
  title?: string
  children: ReactNode
  value?: string | null | undefined
  onChange?: (e: string) => void
}

export const Radio = ({ title, name, value, onChange, children }: Props) => {
  console.log

  return (
    <div className={`${styles.radioContainer} ${inputStyles.input}`}>
      {title && <p className={styles.title}>{title}</p>}

      <RadioGroup.Root
        className={styles.radioGroup}
        name={name}
        value={value}
        onValueChange={(e) => (onChange ? onChange(e) : null)}
      >
        {children}
      </RadioGroup.Root>
    </div>
  )
}
