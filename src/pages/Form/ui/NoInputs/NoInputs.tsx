import styles from './NoInputs.module.scss'

export const NoInputs = () => {
  return (
    <div className={styles['no-inputs']}>
      <p className={styles['no-inputs__title']}>No inputs</p>
      <p className={styles['no-inputs__description']}>
        Create new input using Components tab
      </p>
    </div>
  )
}
