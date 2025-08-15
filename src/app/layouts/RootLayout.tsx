import styles from './RootLayout.module.scss'
import { Outlet } from 'react-router'
import { Header } from '@/shared/ui'
import { Aside } from '@/features/Aside'
import { useFormsStore } from '@/entities/Forms'
import { useEffect } from 'react'
import { ModalProvider } from '@/app/providers/ModalProvider'

export const RootLayout = () => {
  const { getForms } = useFormsStore()

  useEffect(() => {
    getForms()
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
