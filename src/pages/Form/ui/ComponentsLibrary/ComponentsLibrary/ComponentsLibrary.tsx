import styles from './ComponentsLibrary.module.scss'
import pageSectionStyles from '../../../styles/page-section.module.scss'
import { useState, useMemo } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { InputComponentCard } from '@/shared/ui'
import { CloseButton } from '../../CloseButton'
import { componentsCardsList } from '../../../consts'
import { InputTypes } from '@/shared/types/inputs'
import { breakpoints } from '@/shared/consts'

type Props = {
  onComponentSelect?: (componentType: InputTypes) => void
  onCloseTab?: () => void
}

export const ComponentsLibrary = ({ onComponentSelect, onCloseTab }: Props) => {
  const { width = 0 } = useWindowSize()

  const [componentsLibInput, setComponentsLibInput] = useState('')

  const componentsLibFiltered = useMemo(() => {
    const searchInputNormalized = componentsLibInput
      .replaceAll(' ', '')
      .toLowerCase()
    let result = [...componentsCardsList]

    result = result.filter((component) =>
      component.type
        .replaceAll(' ', '')
        .toLowerCase()
        .includes(searchInputNormalized)
    )

    return result
  }, [componentsLibInput, componentsCardsList])

  return (
    <section className={styles.components}>
      {width <= breakpoints.md && (
        <CloseButton onClick={() => onCloseTab?.()} />
      )}

      <h2
        className={`${pageSectionStyles['page-section__title']} ${styles.components__title}`}
      >
        Components
      </h2>
      <input
        className={styles.components__inputSearch}
        type="text"
        placeholder="Search..."
        value={componentsLibInput}
        onChange={(e) => setComponentsLibInput(e.target.value)}
      />
      <div className={styles.components__list}>
        {componentsLibFiltered.map((component) => (
          <InputComponentCard
            key={component.type}
            name={component.type}
            onClick={() => onComponentSelect?.(component.type)}
          >
            {component.content}
          </InputComponentCard>
        ))}
      </div>
    </section>
  )
}
