import { NavLink } from 'react-router'
import { ReactNode } from 'react'
import { useModalStore } from '@/shared/model/Modal'
import styles from './Aside.module.scss'
import { Button } from '@/shared/ui'
import { PlusIcon } from '@radix-ui/react-icons'
import { CreateFormModal } from '@/modals/CreateForm'

interface Props {
  to: string
  children: ReactNode
}

const AsideListItem = ({ to, children }: Props) => {
  return (
    <NavLink className={styles.asideListItem} to={`form/${to}`}>
      {children}
    </NavLink>
  )
}

const links = [
  {
    name: 'first',
  },
  {
    name: 'fie2q3wdrst',
  },
  {
    name: '2314ewq',
  },
]

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

      <div className={styles.aside__list}>
        {links.map((link) => (
          <AsideListItem to={link.name}>{link.name}</AsideListItem>
        ))}
      </div>
    </div>
  )
}
