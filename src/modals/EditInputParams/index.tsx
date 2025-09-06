import styles from './index.module.scss'
import { useRef, useState } from 'react'
import { OptionBadge } from './ui'
import { useInputsStore } from '@/entities/Inputs'
import {
  inputHasOptions,
  InputParamsMap,
  InputTypes,
  type InputOptions,
} from '@/shared/types/inputs'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { useModalStore } from '@/shared/model/Modal'
import { Modal, Button, Input, Checkbox } from '@/shared/ui'

interface Props {
  formName: string
  inputId: string
}

export const EditInputParamsModal = ({ formName, inputId }: Props) => {
  const { setModal } = useModalStore()
  const { inputById, editInput } = useInputsStore()

  const modalInput = inputById(formName, inputId)

  // Check for input (typeguard)
  if (!modalInput) {
    return (
      <Modal title="Edit input params">
        <p>ERROR: Input not found</p>
        <p>form name: {formName}</p>
        <p>input id: {inputId}</p>
      </Modal>
    )
  }

  const modalInputHasOptions = inputHasOptions(modalInput)

  const [params, setParams] = useState<InputParamsMap[InputTypes]>(
    modalInput.params
  )

  const [options, setOptions] = useState<InputOptions>(
    modalInputHasOptions ? modalInput.options : []
  )
  const [optionInputState, setOptionInputState] = useState<boolean>(false)
  const optionInputRef = useRef<HTMLButtonElement>(null)

  useClickOutside(optionInputRef, () => {
    if (optionInputState) setOptionInputState(false)
  })

  const createOption = (text: string) => {
    const textTrimmed = text.trim()

    if (options.includes(textTrimmed)) {
      console.error("Can't duplicate options")
      return
    }

    if (textTrimmed) {
      setOptions([...options, textTrimmed])
      setOptionInputState(false)
    }
  }

  const removeOption = (optionName: string) => {
    const updatedOptions = options.filter((option) => option !== optionName)
    setOptions(updatedOptions)
  }

  const submit = () => {
    let newInput = { ...modalInput }
    newInput.params = params
    if (inputHasOptions(newInput)) {
      newInput.options = options
    }

    try {
      editInput(formName, inputId, inputId, newInput)
      setModal(null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal title="Edit input params">
      {/* Params inputs */}
      <div className={styles['pararms-inputs']}>
        {Object.entries(params).map(([key, value]) => {
          if (typeof value === 'string') {
            return (
              <Input
                key={key}
                placeholder={key}
                value={value}
                onChange={(e) =>
                  setParams({
                    ...params,
                    [key]: e.target.value,
                  })
                }
              />
            )
          } else if (typeof value === 'boolean') {
            return (
              <Checkbox
                key={key}
                label={key}
                checked={value}
                onChange={(e) =>
                  setParams({
                    ...params,
                    [key]: e,
                  })
                }
              />
            )
          }
        })}
      </div>

      {/* Options */}
      {modalInputHasOptions && (
        <div className={styles.options}>
          <p className={styles.options__title}>Options:</p>

          <div className={styles.options__list}>
            {/* Options list */}
            {options.map((option) => (
              <OptionBadge
                state="text"
                text={option}
                onClick={() => removeOption(option)}
              />
            ))}

            {/* Create new option */}
            {optionInputState ? (
              <OptionBadge
                ref={optionInputRef}
                state="input"
                onSubmit={createOption}
              />
            ) : (
              <OptionBadge
                state="plus"
                onClick={() => setOptionInputState(true)}
              />
            )}
          </div>
        </div>
      )}

      {/* Confirm/Cancel buttons */}
      <div className={styles.buttons}>
        <Button color="success" wide type="submit" onClick={() => submit()}>
          Confirm
        </Button>
        <Button color="grey" wide type="button" onClick={() => setModal(null)}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}
