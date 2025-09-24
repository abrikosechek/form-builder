import styles from './FormsListModal.module.scss'
import { NavLink } from 'react-router'
import { useFormsStore } from '../model'
import { Modal } from '@/shared/ui'
import { useModalStore } from '@/shared/model'

export const FormsListModal = () => {
  const { orderedForms } = useFormsStore()
  const { setModal } = useModalStore()

  const forms = orderedForms()

  return (
    <Modal title="Forms">
      <ul className={styles['forms-list']}>
        {forms.map(([formKey]) => (
          <li className={styles['forms-list-item']}>
            <NavLink
              key={formKey}
              className={styles['forms-list-item__link']}
              to={`form/${formKey}`}
              onClick={() => setModal(null)}
            >
              {formKey}
            </NavLink>
          </li>
        ))}
      </ul>
    </Modal>
  )
}
