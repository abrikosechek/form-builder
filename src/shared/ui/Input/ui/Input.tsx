import inputsStyles from '@/shared/styles/inputs.module.scss'
import { ChangeEvent } from 'react'

interface Props {
  placeholder?: string | null
  disabled?: boolean
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any
}

export const Input = ({
  placeholder,
  disabled = false,
  value,
  onChange,
}: Props) => {
  return (
    <div className={inputsStyles['input-container']}>
      {placeholder && <p className={inputsStyles.placeholder}>{placeholder}</p>}

      <input
        className={inputsStyles.input}
        type="text"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
    </div>
  )
}
