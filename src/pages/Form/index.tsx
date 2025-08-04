import styles from './index.module.scss'
import { ComponentCard } from './ui'
import { Input } from '@/shared/ui'

export const FormPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.components}>
        <p className={styles.components__title}>Components</p>
        <input
          className={styles.components__inputSearch}
          type="text"
          placeholder="Search..."
        />
        <div className={styles.components__list}>
          <ComponentCard name="Input">
            <Input disabled={true} />
          </ComponentCard>
        </div>
      </section>

      <section className={styles.workbench}> </section>

      <section className={styles.formPreview}></section>
    </div>
  )
}
