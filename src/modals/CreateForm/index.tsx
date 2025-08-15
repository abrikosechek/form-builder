import styles from './index.module.scss'
import { useNavigate } from 'react-router'
import { useModalStore } from '@/shared/model/Modal'
import { Button, Input } from '@/shared/ui'
import { Modal } from '@/shared/ui/Modal/ui/Modal'
import { useState } from 'react'
import { useFormsStore } from '@/entities/Forms'

export const CreateFormModal = () => {
  const navigate = useNavigate()

  const { setModal } = useModalStore()
  const { createForm } = useFormsStore()

  const [inputValue, setInputValue] = useState('')

  const submit = () => {
    if (inputValue.trim()) {
      createForm(inputValue)
      setModal(null)
      navigate(`/form/${inputValue}`)
    }
  }

  return (
    <Modal title="Create new form">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Form title"
      />

      <div className={styles.buttons}>
        <Button color="success" wide onClick={() => submit()}>
          Create
        </Button>
        <Button color="grey" wide onClick={() => setModal(null)}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}
