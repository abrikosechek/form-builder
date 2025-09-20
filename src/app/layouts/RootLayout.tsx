import styles from './RootLayout.module.scss'
import { Outlet } from 'react-router'
import { Header } from '@/shared/ui'
import { Aside } from '@/widgets/Aside'
import { useFormsStore } from '@/entities/Forms'
import { useEffect } from 'react'
import { ModalProvider } from '@/app/providers/ModalProvider'
import { useInputsStore } from '@/entities/Inputs'

export const RootLayout = () => {
  const { loadForms } = useFormsStore()
  const { loadInputs } = useInputsStore()

  useEffect(() => {
    loadForms()
    loadInputs()
  }, [])

  return (
    <>
      <div className={styles.layout}>
        <Header />
        <Aside />
        <main className={`${styles.main} container`}>
          <Outlet />
        </main>
      </div>

      <ModalProvider />
    </>
  )
}
