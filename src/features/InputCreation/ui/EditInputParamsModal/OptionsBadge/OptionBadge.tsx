import styles from './OptionBadge.module.scss'
import React, { useState } from 'react'
import { CheckIcon, PlusIcon } from '@radix-ui/react-icons'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  ref?: React.Ref<HTMLButtonElement>
} & (
  | {
      state: 'text'
      text: string
    }
  | {
      state: 'plus'
    }
  | {
      state: 'input'
      onSubmit: (text: string) => void
    }
)

export const OptionBadge = (props: Props) => {
  const [input, setInput] = useState<string>('')

  return (
    <button
      ref={props.ref}
      className={`${styles['option-badge']} ${styles[`option-badge--${props.state}`]}`}
      onClick={props.onClick}
    >
      {(props.state === 'text' && (
        <p className={styles['option-badge__text']}>{props.text}</p>
      )) ||
        (props.state === 'input' && (
          <>
            <input
              className={styles['option-badge__input']}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <CheckIcon
              className={styles['option-badge__icon-check']}
              onClick={() => props.onSubmit(input)}
            />
          </>
        )) ||
        (props.state === 'plus' && (
          <PlusIcon className={styles['option-badge__icon-plus']} />
        ))}
    </button>
  )
}
