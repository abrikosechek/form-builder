import styles from './Aside.module.scss'
import { Button } from '@/shared/ui'
import { PlusIcon } from '@radix-ui/react-icons'

export const Aside = () => {
  return (
    <div className={`${styles.aside} container`}>
      <div className={styles.aside__header}>
        <p className={styles.aside__title}>Your forms</p>

        <Button>
          <PlusIcon />
        </Button>
      </div>
      <div className={styles.aside__list}></div>
    </div>
  )
}
