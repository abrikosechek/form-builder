import styles from './Aside.module.scss'
import React from 'react'
import { NavLink } from 'react-router'
import { PlusIcon } from '@radix-ui/react-icons'
import { CreateFormModal } from '@/modals/CreateForm'
import { useFormsStore } from '@/entities/Forms'
import { useModalStore } from '@/shared/model'
import { Button } from '@/shared/ui'

const AsideList = React.memo(function AsideList() {
  const { orderedForms } = useFormsStore()

  const forms = orderedForms()

  return (
    <div className={styles.aside__list}>
      {forms.map(([formKey]) => (
        <NavLink
          key={formKey}
          className={styles.asideListItem}
          to={`form/${formKey}`}
        >
          {formKey}
        </NavLink>
      ))}
    </div>
  )
})

export const Aside = () => {
  const { setModal } = useModalStore()

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

      <AsideList />
    </div>
  )
}
