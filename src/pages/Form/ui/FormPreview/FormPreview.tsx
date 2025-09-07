import styles from './FormPreview.module.scss'
import pageSectionStyles from '../../styles/page-section.module.scss'
import { useState, useEffect } from 'react'
import { TInput } from '@/shared/types/inputs'
import {
  Input,
  Checkbox,
  Radio,
  RadioItem,
  Select,
  SelectItem,
} from '@/shared/ui'

type Props = {
  inputs: Array<[string, TInput]>
}

export const FormPreview = ({ inputs }: Props) => {
  const [inputsList, setInputsList] = useState<Array<[string, TInput]>>(
    structuredClone(inputs)
  )

  const updateInputValue = (inputId: string, value: string | boolean) => {
    let inputToUpdateId = inputsList.findIndex(([id]) => id === inputId)

    if (inputToUpdateId === -1) return

    let inputsListCopy = structuredClone(inputsList)
    inputsListCopy[inputToUpdateId][1].params.value = value

    setInputsList(inputsListCopy)
  }

  useEffect(() => {
    setInputsList(structuredClone(inputs))
  }, [inputs])

  return (
    <section className={styles.formPreview}>
      <h2
        className={` ${pageSectionStyles['page-section__title']} ${styles.formPreview__title}`}
      >
        Form preview
      </h2>

      {inputsList.map(([inputId, inputValue]) =>
        inputValue.type === 'input' ? (
          <Input
            {...inputValue.params}
            key={inputId}
            value={inputValue.params.value}
            onChange={(event) => updateInputValue(inputId, event.target.value)}
          />
        ) : inputValue.type === 'checkbox' ? (
          <Checkbox
            {...inputValue.params}
            key={inputId}
            checked={inputValue.params.value}
            onChange={(value) => updateInputValue(inputId, value)}
          />
        ) : inputValue.type === 'radio' ? (
          <Radio
            {...inputValue.params}
            key={inputId}
            value={inputValue.params.value}
            onChange={(value) => updateInputValue(inputId, value)}
          >
            {inputValue.options.map((option) => (
              <RadioItem value={option}>{option}</RadioItem>
            ))}
          </Radio>
        ) : inputValue.type === 'select' ? (
          <Select
            {...inputValue.params}
            key={inputId}
            value={inputValue.params.value}
            onChange={(value) => updateInputValue(inputId, value)}
          >
            {inputValue.options.map((option) => (
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
