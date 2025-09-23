import styles from './Aside.module.scss'
import { type ReactNode } from 'react'
import { NavLink } from 'react-router'
import { PlusIcon } from '@radix-ui/react-icons'
import { CreateFormModal } from '@/features/FormCreation'
import { useFormsStore } from '@/entities/Forms'
import { useModalStore } from '@/shared/model'
import { Button } from '@/shared/ui'

type Props = {
  children: ReactNode
}

export const Aside = ({ children }: Props) => {
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
