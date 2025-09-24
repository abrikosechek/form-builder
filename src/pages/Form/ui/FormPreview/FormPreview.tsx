import styles from './FormPreview.module.scss'
import pageSectionStyles from '../../styles/page-section.module.scss'
import { useState, useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { CloseButton } from '../CloseButton'
import { TInput } from '@/shared/types/inputs'
import {
  Input,
  Checkbox,
  Radio,
  RadioItem,
  Select,
  SelectItem,
} from '@/shared/ui'
import { breakpoints } from '@/shared/consts'

type Props = {
  inputs: Array<{ id: string; input: TInput }>
  onCloseTab?: () => void
}

export const FormPreview = ({ inputs, onCloseTab }: Props) => {
  const [inputsList, setInputsList] = useState<
    Array<{ id: string; input: TInput }>
  >(structuredClone(inputs))

  const { width = 0 } = useWindowSize()

  const updateInputValue = (inputId: string, value: string | boolean) => {
    let inputToUpdateId = inputsList.findIndex((input) => input.id === inputId)

    if (inputToUpdateId === -1) return

    let inputsListCopy = structuredClone(inputsList)
    inputsListCopy[inputToUpdateId].input.params.value = value

    setInputsList(inputsListCopy)
  }

  useEffect(() => {
    setInputsList(structuredClone(inputs))
  }, [inputs])

  return (
    <section className={styles.formPreview}>
      {width <= breakpoints.md && (
        <CloseButton onClick={() => onCloseTab?.()} />
      )}

      <h2
        className={` ${pageSectionStyles['page-section__title']} ${styles.formPreview__title}`}
      >
        Form preview
      </h2>

      {inputsList.map((input) =>
        input.input.type === 'input' ? (
          <Input
            {...input.input.params}
            key={input.id}
            value={input.input.params.value}
            onChange={(event) => updateInputValue(input.id, event.target.value)}
          />
        ) : input.input.type === 'checkbox' ? (
          <Checkbox
            {...input.input.params}
            key={input.id}
            checked={input.input.params.value}
            onChange={(value) => updateInputValue(input.id, value)}
          />
        ) : input.input.type === 'radio' ? (
          <Radio
            {...input.input.params}
            key={input.id}
            value={input.input.params.value}
            onChange={(value) => updateInputValue(input.id, value)}
          >
            {input.input.options.map((option) => (
              <RadioItem value={option}>{option}</RadioItem>
            ))}
          </Radio>
        ) : input.input.type === 'select' ? (
          <Select
            {...input.input.params}
            key={input.id}
            value={input.input.params.value}
            onChange={(value) => updateInputValue(input.id, value)}
          >
            {input.input.options.map((option) => (
              <SelectItem value={option}>{option}</SelectItem>
            ))}
          </Select>
        ) : (
          <p>component not found</p>
        )
      )}
    </section>
  )
}
