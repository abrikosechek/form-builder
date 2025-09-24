import styles from './FormPage.module.scss'
import pageSectionStyles from '../styles/page-section.module.scss'
import { useEffect, useMemo, useState } from 'react'
import { CodeIcon } from '@radix-ui/react-icons'
import { useParams } from 'react-router'
import { NoInputs } from './NoInputs'
import { ComponentCard } from './ComponentCard'
import { WorkbenchCard, WorkbenchCardContent } from './WorkbenchCard'
import { FormPreview } from './FormPreview'
import { componentsCardsList } from '../consts'
import { ExportFormModal } from '@/features/ExportForm/ui/ExportFormModal'
import { useInputsStore } from '@/entities/Inputs'
import { useModalStore } from '@/shared/model'
import type { InputTypes } from '@/shared/types/inputs'
import { Button } from '@/shared/ui'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export const FormPage = () => {
  let { pageFormName } = useParams()
  const { addInput, removeInput, editInput, inputsByForm, reorderInput } =
    useInputsStore()
  const { setModal } = useModalStore()

  const formInputs = inputsByForm(pageFormName || '')

  const [newInputCardState, setNewInputCardState] = useState<null | InputTypes>(
    null
  )
  const [componentsLibInput, setComponentsLibInput] = useState('')

  useEffect(() => {
    const handleEscDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && newInputCardState)
        setNewInputCardState(null)
    }

    window.addEventListener('keydown', handleEscDown)
    return () => window.removeEventListener('keydown', handleEscDown)
  }, [newInputCardState])

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

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  if (!pageFormName) {
    return <h1>Form not found</h1>
  }
  if (!formInputs) {
    return <h1>Can't load form inputs</h1>
  }

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return
    if (active.id === over.id) return

    if (typeof active.id !== 'string' || typeof over.id !== 'string') return

    reorderInput(pageFormName, active.id, over.id)
  }

  return (
    <div className={styles.page}>
      {/* components lib */}
      <section className={styles.components}>
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
        {Object.keys(formInputs).length === 0 && !newInputCardState ? (
          <NoInputs />
        ) : (
          <>
            <div className={styles.workbench__list}>
              {/* form inputs */}
              <DndContext
                collisionDetection={closestCorners}
                sensors={sensors}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={formInputs}
                  strategy={verticalListSortingStrategy}
                >
                  {formInputs.map((input) => (
                    <WorkbenchCard
                      key={input.id}
                      formName={pageFormName}
                      title={input.input.type}
                      id={input.id}
                      onDelete={() => removeInput(pageFormName, input.id)}
                      onRenameInput={(newId) =>
                        editInput(pageFormName, input.id, newId, input.input)
                      }
                    >
                      <WorkbenchCardContent {...input.input} />
                    </WorkbenchCard>
                  ))}
                </SortableContext>
              </DndContext>

              {/* add form input */}
              {newInputCardState && (
                <WorkbenchCard
                  id="add_new_card-IDIDID"
                  add
                  formName={pageFormName}
                  title={newInputCardState}
                  onCreateInput={(id) => createNewInput(id)}
                  onCancel={() => setNewInputCardState(null)}
                />
              )}
            </div>

            <div className={styles.workbench__footer}>
              <Button
                onClick={() =>
                  setModal({
                    el: <ExportFormModal formId={pageFormName} />,
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
