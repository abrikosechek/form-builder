import { Button } from '@/shared/ui'
import styles from './NoForms.module.scss'
import { PlusIcon } from '@radix-ui/react-icons'
import { useModalStore } from '@/shared/model/Modal'
import { CreateFormModal } from '@/modals/CreateForm'

export const NoForms = () => {
  const setModal = useModalStore((state) => state.setModal)

  const openCreateFormModal = () => {
    setModal({
      el: <CreateFormModal />,
    })
  }

  return (
    <div className={styles.noForms}>
      <p className={styles.noForms__title}>No forms yet</p>
      <p className={styles.noForms__description}>
        Create new form to try our amazing zero-code FormBuilder
      </p>
      <Button onClick={(e) => openCreateFormModal()}>
        <PlusIcon />
        <p>create form</p>
      </Button>
    </div>
  )
}
