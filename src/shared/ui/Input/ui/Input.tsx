import { ChangeEvent } from 'react'
import inputsStyles from '@/shared/styles/inputs.module.scss'

interface Props {
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => any
}

export const Input = ({ placeholder, value, onChange }: Props) => {
  return (
    <div className={inputsStyles.inputContainer}>
      {placeholder && <p className={inputsStyles.placeholder}>{placeholder}</p>}

      <input
        className={inputsStyles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}
