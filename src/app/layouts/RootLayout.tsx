import styles from './RootLayout.module.scss'
import { Outlet } from 'react-router'
import { Header } from '@/widgets/Header'
import { Aside } from '@/widgets/Aside'
import { useFormsStore } from '@/entities/Forms'
import { useEffect } from 'react'
import { ModalProvider } from '@/app/providers/ModalProvider'
import { useInputsStore } from '@/entities/Inputs'
import { useWindowSize } from 'usehooks-ts'
import { breakpoints } from '@/shared/consts'

export const RootLayout = () => {
  const { loadForms } = useFormsStore()
  const { loadInputs } = useInputsStore()

  const { width = 0 } = useWindowSize()

  useEffect(() => {
    loadForms()
    loadInputs()
  }, [])

  return (
    <>
      <div className={styles.layout}>
        <Header />
        {width > breakpoints.md && <Aside />}
        <main className={`${styles.main} container`}>
          <Outlet />
        </main>
      </div>

      <ModalProvider />
    </>
  )
}
