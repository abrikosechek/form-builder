import styles from './WorkbenchCard.module.scss'
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import {
  CheckIcon,
  Cross1Icon,
  HamburgerMenuIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { useClickOutside } from '@/shared/hooks/useClickOutside'

interface WorkbenchCardIdProps {
  isEdit?: boolean
  id?: string
  onSubmit?: (inputValue: string) => void
  onEnableEdit?: () => void
}

const WorkbenchCardId = ({
  isEdit = false,
  id,
  onSubmit,
  onEnableEdit,
}: WorkbenchCardIdProps) => {
  if (isEdit) {
    const [input, setInput] = useState(id || '')
    const inputEl = useRef<HTMLInputElement>(null)

    useEffect(() => {
      inputEl.current?.focus()
    }, [isEdit])

    return (
      // id input
      <form
        className={styles.workbenchCardId}
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.(input)
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
      </form>
    )
  } else {
    return (
      // id display
      <div className={styles.workbenchCardId}>
        <button
          className={`${styles.workbenchCardId__button} ${styles['workbenchCardId__button--edit']}`}
          onClick={onEnableEdit}
        >
          <Pencil2Icon />
        </button>

        <p className={styles.workbenchCardId__text}>#{id}</p>
      </div>
    )
  }
}

interface Props {
  id?: string
  title: string
  add?: boolean
  ref?: RefObject<HTMLDivElement | null>
  onCancel?: () => void
  onCreateInput?: (inputId: string) => void
  onDelete?: () => void
  children?: ReactNode
}

export const WorkbenchCard = ({
  id,
  title,
  add = false,
  ref,
  onCancel,
  onCreateInput,
  onDelete,
  children,
}: Props) => {
  // create new input
  const submitId = (newId: string) => {
    const newIdNormalized = newId.replaceAll(' ', '')

    if (!newIdNormalized) {
      console.error('Id input is empty')
      return
    }

    onCreateInput?.(newIdNormalized)
  }

  // RENDER
  return (
    <div ref={ref} className={styles.workbenchCard}>
      {/* header */}
      <div className={styles.workbenchCard__header}>
        {!add && (
          <div className={styles.workbenchCard__drag}>
            <HamburgerMenuIcon />
          </div>
        )}

        <p className={styles.workbenchCard__name}>&lt;{title} /&gt;</p>

        {add ? (
          <button
            className={styles.workbenchCard__buttonDelete}
            onClick={() => onCancel?.()}
          >
            <Cross1Icon />
          </button>
        ) : (
          <button
            className={styles.workbenchCard__buttonDelete}
            onClick={() => onDelete?.()}
          >
            <TrashIcon />
          </button>
        )}
      </div>

      {/* id */}
      {add ? (
        <WorkbenchCardId isEdit onSubmit={submitId} />
      ) : (
        <WorkbenchCardId id={id} />
      )}

      {/* content */}
      <div className={styles.workbenchCard__content}>{children}</div>

      {/* params */}
      {!add && (
        <div className={styles.workbenchCardEdit}>
          <button className={styles.workbenchCardEdit__button}>
            <MixerHorizontalIcon />
          </button>

          <p className={styles.workbenchCardEdit__text}>params</p>
        </div>
      )}
    </div>
  )
}
