import styles from './index.module.scss'
import { RadioItem } from '@/shared/ui/Radio/ui/RadioItem'
import { ComponentCard, WorkbenchCard } from './ui'
import { Checkbox, Input, Radio, Select } from '@/shared/ui'
import { ReactNode, useMemo, useReducer, useRef, useState } from 'react'
import { useFormsStore } from '@/entities/Forms'
import { useParams } from 'react-router'
import type { InputTypes, TInput } from '@/shared/types/inputs'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { SelectItem } from '@/shared/ui/Select'

type componentsLibItem = {
  type: InputTypes
  content: ReactNode
}

const componentsLib: componentsLibItem[] = [
  {
    type: 'input',
    content: <Input disabled />,
  },
  {
    type: 'checkbox',
    content: <Checkbox disabled />,
  },
  {
    type: 'radio',
    content: (
      <Radio disabled>
        <RadioItem disabled>Option</RadioItem>
      </Radio>
    ),
  },
  {
    type: 'select',
    content: <Select disabled />,
  },
]

const WorkbenchCardContent = (props: TInput) => {
  return (
    <>
      {props.type === 'input' ? (
        <Input {...props.params} disabled />
      ) : props.type === 'checkbox' ? (
        <Checkbox {...props.params} disabled />
      ) : props.type === 'radio' ? (
        <Radio {...props.params} disabled>
          {props.options.map((item) => (
            <RadioItem key={item} value={item}>
              {item}
            </RadioItem>
          ))}
        </Radio>
      ) : props.type === 'select' ? (
        <Select {...props.params} disabled>
          {props.options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      ) : (
        <p>component not found</p>
      )}
    </>
  )
}

export const FormPage = () => {
  let params = useParams()

  const { forms, addInput, removeInput } = useFormsStore()

  const pageForm = useMemo(
    () => forms.find((form) => form.name == params.formName),
    [forms]
  )

  const newInputCardEl = useRef(null)
  useClickOutside(newInputCardEl, () => setNewInputCardState(null))

  const [newInputCardState, setNewInputCardState] = useState<null | InputTypes>(
    null
  )

  const createNewInput = (id: string) => {
    if (!params.formName) {
      console.error("Can't find current form name")
      return
    }
    if (!newInputCardState) {
      console.error("Can't find new input type")
      return
    }

    addInput(params.formName, id, newInputCardState)
    setNewInputCardState(null)
  }

  // RENDER
  if (!pageForm) {
    return <h1>No such form</h1>
  }

  return (
    <div className={styles.page}>
      {/* components lib */}
      <section className={styles.components}>
        <h2 className={styles.components__title}>Components</h2>
        <input
          className={styles.components__inputSearch}
          type="text"
          placeholder="Search..."
        />
        <div className={styles.components__list}>
          {componentsLib.map((component) => (
            <ComponentCard
              key={component.type}
              name={component.type}
              onClick={() => setNewInputCardState(component.type)}
            >
              {component.content}
            </ComponentCard>
          ))}
        </div>
      </section>

      {/* workbench */}
      <section className={styles.workbench}>
        {/* form inputs */}
        {pageForm.inputs.map((input) => (
          <WorkbenchCard
            key={input.id}
            title={input.type}
            id={input.id}
            onDelete={() => removeInput(params.formName || '', input.id)}
          >
            <WorkbenchCardContent {...input} />
          </WorkbenchCard>
        ))}

        {/* add form input */}
        {newInputCardState && (
          <WorkbenchCard
            ref={newInputCardEl}
            add
            title={newInputCardState}
            onSubmitId={(id) => createNewInput(id)}
            onCancel={() => setNewInputCardState(null)}
          />
        )}
      </section>

      {/* form preview */}
      <section className={styles.formPreview}>
        <h2 className={styles.formPreview__title}>Form preview</h2>

        <Input />
        <Checkbox label="Are you sure?" />
      </section>
    </div>
  )
}
