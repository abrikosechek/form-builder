import { Button } from '@/shared/ui'
import styles from './NoForms.module.scss'
import { PlusIcon } from '@radix-ui/react-icons'

export const NoForms = () => {
  return (
    <div className={styles.noForms}>
      <p className={styles.noForms__title}>No forms yet</p>
      <p className={styles.noForms__description}>
        Create new form to try our amazing zero-code FormBuilder
      </p>
      <Button>
        <PlusIcon />
        <p>create form</p>
      </Button>
    </div>
  )
}
