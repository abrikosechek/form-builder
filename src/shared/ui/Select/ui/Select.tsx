import inputsStyles from '@/shared/styles/inputs.module.scss'
import styles from './Select.module.scss'
import { DropdownMenu } from 'radix-ui'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'

interface Props {
  value?: string
  onChange?: (e: string) => any
  disabled?: boolean
  children?: ReactNode
}

export const Select = ({
  value,
  disabled = false,
  onChange,
  children,
}: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild disabled={disabled}>
        <button className={`${styles.selectTrigger} ${inputsStyles.input}`}>
          <p>{value || 'Select'}</p>
          <CaretDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${styles.selectContent} ${inputsStyles.input}`}
        >
          <DropdownMenu.RadioGroup value={value} onValueChange={onChange}>
            {children}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
