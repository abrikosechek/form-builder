import styles from './WorkbenchCardId.module.scss'
import { useState, useRef } from 'react'
import { CheckIcon, Cross1Icon, Pencil2Icon } from '@radix-ui/react-icons'

interface Props {
  id?: string
  isEdit?: boolean
  cancelButton?: boolean
  onSubmit?: (inputValue: string) => void
  onEnableEdit?: () => void
  onCancel?: () => void
}

export const WorkbenchCardId = ({
  id,
  isEdit = false,
  cancelButton = false,
  onSubmit,
  onEnableEdit,
  onCancel,
}: Props) => {
  if (isEdit) {
    const [input, setInput] = useState(id || '')
    const inputEl = useRef<HTMLInputElement>(null)

    const submit = () => {
      const newIdNormalized = input.replaceAll(' ', '')

      if (!newIdNormalized) {
        console.error('Id input is empty')
        return
      }

      onSubmit?.(newIdNormalized)
    }

    return (
      <form
        className={styles.workbenchCardId}
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <button
          className={`${styles.workbenchCardId__button} ${styles['workbenchCardId__button--submit']}`}
          type="submit"
        >
          <CheckIcon />
        </button>

        <input
          ref={inputEl}
          className={styles.workbenchCardId__input}
          type="text"
          placeholder="id"
          maxLength={150}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {cancelButton && (
          <button
            className={`${styles.workbenchCardId__button} ${styles['workbenchCardId__button--cancel']}`}
            type="button"
            onClick={() => onCancel?.()}
          >
            <Cross1Icon />
          </button>
        )}
      </form>
    )
  } else {
    return (
      <div className={styles.workbenchCardId}>
        <button
          className={`${styles.workbenchCardId__button} ${styles['workbenchCardId__button--edit']}`}
          onClick={() => onEnableEdit?.()}
        >
          <Pencil2Icon />
        </button>

        <p className={styles.workbenchCardId__text}>#{id}</p>
      </div>
    )
  }
}
