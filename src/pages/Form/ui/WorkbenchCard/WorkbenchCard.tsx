import { ReactNode } from 'react'
import styles from './WorkbenchCard.module.scss'
import {
  HamburgerMenuIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons'

interface Props {
  children: ReactNode
}

export const WorkbenchCard = ({ children }: Props) => {
  return (
    <div className={styles.workbenchCard}>
      {/* header */}
      <div className={styles.workbenchCard__header}>
        <div className={styles.workbenchCard__drag}>
          <HamburgerMenuIcon />
        </div>
        <p className={styles.workbenchCard__name}>&lt;Text /&gt;</p>
        <button className={styles.workbenchCard__buttonDelete}>
          <TrashIcon />
        </button>
      </div>

      {/* id */}
      <div className={styles.workbenchCardId}>
        <button className={styles.workbenchCardId__buttonEdit}>
          <Pencil2Icon />
        </button>

        <p className={styles.workbenchCardId__text}>#email</p>
      </div>

      {/* content */}
      <div className={styles.workbenchCard__content}>{children}</div>

      {/* edit */}
      <div className={styles.workbenchCardEdit}>
        <button className={styles.workbenchCardEdit__button}>
          <MixerHorizontalIcon />
        </button>

        <p className={styles.workbenchCardEdit__text}>params</p>
      </div>
    </div>
  )
}
