import styles from './CreateForm.module.scss'
import { Button, Input } from '@/shared/ui'
import { Modal } from '@/shared/ui/Modal/ui/Modal'
import { useState } from 'react'

export const CreateFormModal = () => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Modal title="Create new form">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Form title"
      />

      <div className={styles.buttons}>
        <Button color="success" wide>
          Create
        </Button>
        <Button color="grey" wide>Cancel</Button>
      </div>
    </Modal>
  )
}
