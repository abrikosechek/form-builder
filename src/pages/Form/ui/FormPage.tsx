import styles from './FormPage.module.scss'
import pageSectionStyles from '../styles/page-section.module.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CodeIcon } from '@radix-ui/react-icons'
import { useParams } from 'react-router'
import { NoInputs } from './NoInputs'
import { ComponentCard } from './ComponentCard'
import { WorkbenchCard, WorkbenchCardContent } from './WorkbenchCard'
import { FormPreview } from './FormPreview'
import { componentsCardsList } from '../consts'
import { ExportFormModal } from '@/modals/ExportForm'
import { useFormsStore } from '@/entities/Forms'
import { useInputsStore } from '@/entities/Inputs'
import { useModalStore } from '@/shared/model'
import type { InputTypes, TInput } from '@/shared/types/inputs'
import { useClickOutside } from '@/shared/hooks'
import { Button } from '@/shared/ui'

export const FormPage = () => {
  // route params, zustand
  let { pageFormName } = useParams()
  const { formById } = useFormsStore()
  const { addInput, removeInput, editInput, inputsByForm } = useInputsStore()
  const { setModal } = useModalStore()

  // page form, inputs
  const pageForm = formById(pageFormName || '')
  const formInputs = inputsByForm(pageFormName || '')

  // create new input
  const [newInputCardState, setNewInputCardState] = useState<null | InputTypes>(
    null
  )

  const createNewInput = (id: string) => {
    if (!pageFormName) {
      console.error("Can't find current form name")
      return
    }
    if (!newInputCardState) {
      console.error("Can't find new input type")
      return
    }

    try {
      addInput(pageFormName, id, newInputCardState)
      setNewInputCardState(null)
    } catch (error) {
      console.error(error)
    }
  }

  // close newInputCard
  //-- on click outside
  const newInputCardEl = useRef(null)
  useClickOutside(newInputCardEl, () => setNewInputCardState(null))

  //-- on "esc" keyboard button
  useEffect(() => {
    const handleEscDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && newInputCardState)
        setNewInputCardState(null)
    }

    window.addEventListener('keydown', handleEscDown)
    return () => window.removeEventListener('keydown', handleEscDown)
  }, [newInputCardState])

  // components lib items filtered
  const [componentsLibInput, setComponentsLibInput] = useState('')

  const componentsLibFiltered = useMemo(() => {
    const searchInputNormalized = componentsLibInput
      .replaceAll(' ', '')
      .toLowerCase()
    let result = [...componentsCardsList]

    // filter by search (case-insensitive, whitespace-insensitive)
    result = result.filter((component) =>
      component.type
        .replaceAll(' ', '')
        .toLowerCase()
        .includes(searchInputNormalized)
    )

    return result
  }, [componentsLibInput, componentsCardsList])

  // RENDER
  if (!pageForm || !formInputs) {
    return <h1>No such form</h1>
  }

  return (
    <div className={styles.page}>
      {/* components lib */}
      <section className={styles.components}>
        <h2
          className={` ${pageSectionStyles['page-section__title']} ${styles.components__title}`}
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
        {formInputs.length === 0 && !newInputCardState ? (
          <NoInputs />
        ) : (
          <>
            <div className={styles.workbench__list}>
              {/* form inputs */}
              {formInputs.map((input) => (
                <WorkbenchCard
                  key={input.id}
                  formName={pageFormName || ''}
                  title={input.input.type}
                  id={input.id}
                  onDelete={() => removeInput(pageFormName || '', input.id)}
                  onRenameInput={(newId) =>
                    editInput(pageFormName || '', input.id, newId, input.input)
                  }
                >
                  <WorkbenchCardContent {...input.input} />
                </WorkbenchCard>
              ))}

              {/* add form input */}
              {newInputCardState && (
                <WorkbenchCard
                  add
                  formName={pageFormName || ''}
                  title={newInputCardState}
                  ref={newInputCardEl}
                  onCreateInput={(id) => createNewInput(id)}
                  onCancel={() => setNewInputCardState(null)}
                />
              )}
            </div>

            <div className={styles.workbench__footer}>
              <Button
                onClick={() =>
                  setModal({
                    el: <ExportFormModal formId={pageFormName || ''} />,
                  })
                }
              >
                Export
                <CodeIcon />
              </Button>
            </div>
          </>
        )}
      </section>

      {/* form preview */}
      <FormPreview inputs={formInputs} />
    </div>
  )
}
