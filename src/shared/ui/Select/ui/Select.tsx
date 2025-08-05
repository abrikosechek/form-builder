import inputsStyles from '@/shared/styles/inputs.module.scss'
import styles from './Select.module.scss'
import { DropdownMenu } from 'radix-ui'
import { CaretDownIcon } from '@radix-ui/react-icons'

type Option = {
  value: string
  label?: string
}

interface Props {
  value?: string
  onChange?: (e: string) => any
  options: Option[]
  disabled?: boolean
}

export const Select = ({
  value,
  onChange,
  options,
  disabled = false,
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
            {options.map((option) => (
              <DropdownMenu.RadioItem
                className={styles.selectItem}
                value={option.value}
              >
                <p>{option.label || option.value}</p>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
