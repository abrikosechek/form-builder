import styles from './RootLayout.module.scss'
import { Outlet } from 'react-router'
import { Header } from '@/shared/ui'
import { Aside } from '@/features/Aside'

export const RootLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <Aside />

      <main className={`${styles.main} container`}>
        <Outlet />
      </main>
    </div>
  )
}
