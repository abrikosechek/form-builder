import styles from './Aside.module.scss'
import React from 'react'
import { NavLink } from 'react-router'
import { PlusIcon } from '@radix-ui/react-icons'
import { CreateFormModal } from '@/modals/CreateForm'
import { useFormsStore } from '@/entities/Forms'
import { useModalStore } from '@/shared/model/Modal'
import { Button } from '@/shared/ui'

const AsideList = React.memo(function AsideList() {
  const { forms } = useFormsStore()

  return (
    <div className={styles.aside__list}>
      {forms.map((form) => (
        <NavLink
          key={form.name}
          className={styles.asideListItem}
          to={`form/${form.name}`}
        >
          {form.name}
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
