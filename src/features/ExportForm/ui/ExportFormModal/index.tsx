import { useInputsStore } from '@/entities/Inputs'
import { Modal } from '@/shared/ui'
import { Code } from '@/shared/ui/Code'
import { generateFormText } from '../../utils'

interface Props {
  formId: string
}

export const ExportFormModal = ({ formId }: Props) => {
  const { inputsByForm } = useInputsStore()

  const formInputs = inputsByForm(formId)

  const codeTabs = [
    {
      name: 'HTML',
      text: generateFormText(formInputs || []),
    },
  ]

  return (
    <Modal title="Export form">
      {formInputs ? <Code tabs={codeTabs} /> : <p>Form "{formId}" not found</p>}
    </Modal>
  )
}
