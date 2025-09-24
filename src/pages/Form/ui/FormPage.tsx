import styles from './FormPage.module.scss'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CodeIcon,
} from '@radix-ui/react-icons'
import { useParams } from 'react-router'
import { NoInputs } from './NoInputs'
import { WorkbenchCard, WorkbenchCardContent } from './WorkbenchCard'
import { FormPreview } from './FormPreview'
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
import { ComponentsLibrary } from './ComponentsLibrary'
import { useWindowSize } from 'usehooks-ts'
import { breakpoints } from '@/shared/consts'

export const FormPage = () => {
  let { pageFormName } = useParams()
  const { addInput, removeInput, editInput, inputsByForm, reorderInput } =
    useInputsStore()
  const { setModal } = useModalStore()
  const { width = 0 } = useWindowSize()

  const formInputs = inputsByForm(pageFormName || '')

  const [newInputCardState, setNewInputCardState] = useState<null | InputTypes>(
    null
  )

  useEffect(() => {
    const handleEscDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && newInputCardState)
        setNewInputCardState(null)
    }

    window.addEventListener('keydown', handleEscDown)
    return () => window.removeEventListener('keydown', handleEscDown)
  }, [newInputCardState])

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const [openedTab, setOpenedTab] = useState<number>(1)

  const pageInnerMoveAmount = useMemo(
    () => (width > breakpoints.md ? '0%' : `${-100 * openedTab}%`),
    [openedTab]
  )

  const openNewInputCard = (inputType: InputTypes) => {
    setNewInputCardState(inputType)
    setOpenedTab(1)
  }

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
      <div
        className={styles.page__inner}
        style={{
          left: pageInnerMoveAmount,
        }}
      >
        {/* components lib */}
        <ComponentsLibrary
          onComponentSelect={openNewInputCard}
          onCloseTab={() => setOpenedTab(1)}
        />

        {/* workbench */}
        <section className={styles.workbench}>
          {/* workbench content */}
          {Object.keys(formInputs).length === 0 && !newInputCardState ? (
            <NoInputs />
          ) : (
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
                      id={input.id}
                      formName={pageFormName}
                      title={input.input.type}
                      sortable
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
          )}

          {/* workbench footer */}
          <div className={styles.workbench__footer}>
            {width <= breakpoints.md && (
              <div
                className={`${styles['workbench-footer-tab']} ${styles['border-right']}`}
                onClick={() => setOpenedTab(0)}
              >
                <CaretLeftIcon
                  className={styles['workbench-footer-tab__icon']}
                />
                <p className={styles['workbench-footer-tab__text']}>
                  Components
                </p>
              </div>
            )}

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

            {width <= breakpoints.md && (
              <div
                className={`${styles['workbench-footer-tab']} ${styles['border-left']}`}
                onClick={() => setOpenedTab(2)}
              >
                <p className={styles['workbench-footer-tab__text']}>Preview</p>
                <CaretRightIcon
                  className={styles['workbench-footer-tab__icon']}
                />
              </div>
            )}
          </div>
        </section>

        {/* form preview */}
        <FormPreview inputs={formInputs} onCloseTab={() => setOpenedTab(1)} />
      </div>
    </div>
  )
}
