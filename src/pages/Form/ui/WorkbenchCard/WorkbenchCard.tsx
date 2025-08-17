import styles from './WorkbenchCard.module.scss'
import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  CheckIcon,
  Cross1Icon,
  HamburgerMenuIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons'

interface WorkbenchCardIdProps {
  isEdit?: boolean
  id?: string
  onSubmit?: (inputValue: string) => void
}

const WorkbenchCardId = ({
  isEdit = false,
  id,
  onSubmit,
}: WorkbenchCardIdProps) => {
  if (isEdit) {
    const [input, setInput] = useState(id || '')
    const inputComponent = useRef<HTMLInputElement>(null)

    useEffect(() => {
      inputComponent.current?.focus()
    }, [isEdit])

    return (
      // id input
      <div className={styles.workbenchCardId}>
        <button
          className={`${styles.workbenchCardId__button} ${styles['workbenchCardId__button--submit']}`}
          onClick={() => onSubmit?.(input)}
        >
          <CheckIcon />
        </button>
        <input
          ref={inputComponent}
          className={styles.workbenchCardId__input}
          type="text"
          maxLength={150}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={() => onSubmit?.(input)}
        />
        1
      </div>
    )
  } else {
    return (
      // id display
      <div className={styles.workbenchCardId}>
        <button
          className={`${styles.workbenchCardId__button} ${styles['workbenchCardId__button--edit']}`}
        >
          <Pencil2Icon />
        </button>

        <p className={styles.workbenchCardId__text}>#{id}</p>
      </div>
    )
  }
}

interface Props {
  title: string
  id?: string
  add?: boolean
  children?: ReactNode
}

export const WorkbenchCard = ({ title, id, add = false, children }: Props) => {
  const closeCard = () => {
    console.log('Close "Add workbench card"')
  }

  const createForm = () => {
    console.log('Create new form"')
  }

  useEffect(() => {
    if (add) {
      const handleEscDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeCard()
        }
      }

      window.addEventListener('keydown', handleEscDown)
      return () => window.removeEventListener('keydown', handleEscDown)
    }
  }, [])

  return (
    <div className={styles.workbenchCard}>
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
            onClick={() => closeCard()}
          >
            <Cross1Icon />
          </button>
        ) : (
          <button className={styles.workbenchCard__buttonDelete}>
            <TrashIcon />
          </button>
        )}
      </div>

      {/* id */}
      {add ? (
        <WorkbenchCardId isEdit onSubmit={() => createForm()} />
      ) : (
        <WorkbenchCardId id="email" />
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
