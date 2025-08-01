import { useModalStore } from '@/shared/model/Modal'
import styles from './Aside.module.scss'
import { Button } from '@/shared/ui'
import { PlusIcon } from '@radix-ui/react-icons'
import { CreateFormModal } from '@/modals/CreateForm'

export const Aside = () => {
  const setModal = useModalStore((state) => state.setModal)

  const openCreateFormModal = () => {
    setModal({
      el: <CreateFormModal />,
    })
  }

  return (
    <div className={`${styles.aside} container`}>
      <div className={styles.aside__header}>
        <p className={styles.aside__title}>Your forms</p>

        <Button onClick={() => openCreateFormModal()}>
          <PlusIcon />
        </Button>
      </div>
      <div className={styles.aside__list}></div>
    </div>
  )
}
