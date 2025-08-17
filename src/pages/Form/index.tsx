import styles from './index.module.scss'
import { RadioItem } from '@/shared/ui/Radio/ui/RadioItem'
import { ComponentCard, WorkbenchCard } from './ui'
import { Checkbox, Input, Radio, Select } from '@/shared/ui'
import { ReactNode, useMemo, useReducer, useState } from 'react'
import { useFormsStore } from '@/entities/Forms'
import { useParams } from 'react-router'
import type { InputTypes, TInput } from '@/shared/types/inputs'

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
        <RadioItem disabled label="Option" />
      </Radio>
    ),
  },
  {
    type: 'select',
    content: <Select disabled items={[]} />,
  },
]

const WorkbenchCardSample = (props: TInput) => {
  return (
    <WorkbenchCard title={props.type} id={props.id}>
      {props.type === 'input' ? (
        <Input {...props.params} />
      ) : props.type === 'checkbox' ? (
        <Checkbox {...props.params} />
      ) : props.type === 'radio' ? (
        // DO COMPONENT
        <Radio {...props.params} />
      ) : props.type === 'select' ? (
        // DO COMPONENT
        <Select {...props.params} />
      ) : (
        <p>component not found</p>
      )}
    </WorkbenchCard>
  )
}

type NewInputReducerState =
  | {
      active: true
      type: InputTypes
      id: string
    }
  | { active: false }

type NewInputReducerAction =
  | {
      type: 'CREATE'
      payload: InputTypes
    }
  | {
      type: 'UPDATE_ID'
      payload: string
    }
  | {
      type: 'CANCEL'
    }

const newInputReducer = (
  state: NewInputReducerState,
  action: NewInputReducerAction
): NewInputReducerState => {
  switch (action.type) {
    case 'CREATE':
      return {
        active: true,
        type: action.payload,
        id: '',
      }
    case 'UPDATE_ID':
      if (state.active) {
        return {
          ...state,
          id: action.payload,
        }
      } else {
        return state
      }
    case 'CANCEL':
      return {
        active: false,
      }
    default:
      return {
        active: false,
      }
  }
}

export const FormPage = () => {
  let params = useParams()

  const { forms } = useFormsStore()

  const pageForm = useMemo(
    () => forms.find((form) => form.name == params.formName),
    [forms]
  )

  const [newInput, dispatchNewInput] = useReducer(newInputReducer, {
    active: false,
  })

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
              onClick={() =>
                dispatchNewInput({
                  type: 'CREATE',
                  payload: component.type,
                })
              }
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
          <WorkbenchCardSample {...input} />
        ))}

        {/* add form input */}
        {newInput.active && (
          <WorkbenchCard
            add
            title={newInput.type}
            onCancel={() =>
              dispatchNewInput({
                type: 'CANCEL',
              })
            }
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
