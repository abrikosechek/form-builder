import styles from './Aside.module.scss'
import { NavLink } from 'react-router'
import { PlusIcon } from '@radix-ui/react-icons'
import { CreateFormModal } from '@/features/FormCreation'
import { useFormsStore } from '@/entities/Forms'
import { useModalStore } from '@/shared/model'
import { Button } from '@/shared/ui'

export const Aside = () => {
  const { setModal } = useModalStore()
  const { orderedForms } = useFormsStore()

  const forms = orderedForms()

  const openCreateFormModal = () => {
    setModal({
      el: <CreateFormModal />,
    })
  }

  return (
    <div className={`${styles.aside} container`}>
      <div className={styles.aside__header}>
        <p className={styles.aside__title}>Forms</p>
        <Button onClick={() => openCreateFormModal()}>
          <PlusIcon />
        </Button>
      </div>

      <div className={styles.aside__list}>
        {forms.map(([formKey]) => (
          <NavLink
            key={formKey}
            className={styles['aside-link']}
            to={`form/${formKey}`}
          >
            {formKey}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
