import styles from './NoForms.module.scss'
import { Button } from '@/shared/ui'
import { PlusIcon } from '@radix-ui/react-icons'
import { useModalStore } from '@/shared/model'
import { CreateFormModal } from '@/features/FormCreation'

export const NoForms = () => {
  const setModal = useModalStore((state) => state.setModal)

  const openCreateFormModal = () => {
    setModal({
      el: <CreateFormModal />,
    })
  }

  return (
    <div className={styles['no-forms']}>
      <p className={styles['no-forms__title']}>No forms</p>
      <p className={styles['no-forms__description']}>
        Create new form to try our amazing FormBuilder
      </p>
      <Button onClick={() => openCreateFormModal()}>
        <PlusIcon />
        <p>create form</p>
      </Button>
    </div>
  )
}
