import styles from './index.module.scss'
import { useInputsStore } from '@/entities/Inputs'
import { useFormsStore } from '@/entities/Forms'
import { useModalStore } from '@/shared/model'
import { Modal } from '@/shared/ui'

interface Props {
  formId: string
}

export const ExportFormModal = ({ formId }: Props) => {
  const { setModal } = useModalStore()
  const { formById } = useFormsStore()
  const { inputsByForm } = useInputsStore()

  const formInputs = inputsByForm(formId)

  return (
    <Modal title="Export form">
      {formInputs ? (
        formInputs.map(([inputId]) => <p>{inputId}</p>)
      ) : (
        <p>Form "{formId}" not found</p>
      )}
    </Modal>
  )
}
