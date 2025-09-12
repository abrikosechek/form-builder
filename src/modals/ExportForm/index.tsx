import styles from './index.module.scss'
import { useInputsStore } from '@/entities/Inputs'
import { useFormsStore } from '@/entities/Forms'
import { useModalStore } from '@/shared/model'
import { Modal } from '@/shared/ui'
import { Code } from '@/shared/ui/Code'
import { generateFormText } from './utils'

interface Props {
  formId: string
}

export const ExportFormModal = ({ formId }: Props) => {
  const { setModal } = useModalStore()
  const { formById } = useFormsStore()
  const { inputsByForm } = useInputsStore()

  const formInputs = inputsByForm(formId)

  const codeTabs = [
    {
      name: 'HTML',
      text: generateFormText(formId, formInputs || []),
    },
    {
      name: 'React',
      text: `
      a`,
    },
  ]

  return (
    <Modal title="Export form">
      {formInputs ? <Code tabs={codeTabs} /> : <p>Form "{formId}" not found</p>}
    </Modal>
  )
}
