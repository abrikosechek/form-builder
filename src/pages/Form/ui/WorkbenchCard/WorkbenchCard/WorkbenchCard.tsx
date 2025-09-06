import styles from './WorkbenchCard.module.scss'
import { ReactNode, RefObject, useState } from 'react'
import {
  Cross1Icon,
  HamburgerMenuIcon,
  MixerHorizontalIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { WorkbenchCardId } from '../WorkbenchCardId'
import { EditInputParamsModal } from '@/modals/EditInputParams'
import { useModalStore } from '@/shared/model/Modal'

interface Props {
  id?: string
  formName: string
  title: string
  add?: boolean
  ref?: RefObject<HTMLDivElement | null>
  onCancel?: () => void
  onCreateInput?: (inputId: string) => void
  onRenameInput?: (newId: string) => void
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
  onRenameInput,
  onDelete,
  children,
  formName,
}: Props) => {
  // zustand
  const { setModal } = useModalStore()

  // rename input (change id)
  const [isRename, setIsRename] = useState(false)

  const renameInput = (newId: string) => {
    setIsRename(false)
    onRenameInput?.(newId)
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
        <WorkbenchCardId isEdit onSubmit={onCreateInput} />
      ) : isRename ? (
        <WorkbenchCardId
          isEdit
          cancelButton
          id={id}
          onSubmit={renameInput}
          onCancel={() => setIsRename(false)}
        />
      ) : (
        <WorkbenchCardId id={id} onEnableEdit={() => setIsRename(true)} />
      )}

      {/* content */}
      <div className={styles.workbenchCard__content}>{children}</div>

      {/* params */}
      {!add && (
        <button
          className={styles.workbenchCardEdit}
          onClick={() =>
            setModal({
              el: (
                <EditInputParamsModal formName={formName} inputId={id || ''} />
              ),
            })
          }
        >
          <MixerHorizontalIcon className={styles.workbenchCardEdit__icon} />
          <p className={styles.workbenchCardEdit__text}>params</p>
        </button>
      )}
    </div>
  )
}
