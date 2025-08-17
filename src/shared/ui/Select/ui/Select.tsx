import inputsStyles from '@/shared/styles/inputs.module.scss'
import styles from './Select.module.scss'
import { DropdownMenu } from 'radix-ui'
import { CaretDownIcon } from '@radix-ui/react-icons'

interface Props {
  value?: string
  onChange?: (e: string) => any
  items: string[]
  disabled?: boolean
}

export const Select = ({ value, onChange, items, disabled = false }: Props) => {
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
            {items.map((item) => (
              <DropdownMenu.RadioItem
                className={styles.selectItem}
                value={item}
              >
                <p>{item}</p>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
