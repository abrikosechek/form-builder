import styles from './index.module.scss'
import { RadioItem } from '@/shared/ui/Radio/ui/RadioItem'
import { ComponentCard, WorkbenchCard } from './ui'
import { Checkbox, Input, Radio, Select } from '@/shared/ui'

export const FormPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.components}>
        <h2 className={styles.components__title}>Components</h2>
        <input
          className={styles.components__inputSearch}
          type="text"
          placeholder="Search..."
        />
        <div className={styles.components__list}>
          <ComponentCard name="Input">
            <Input disabled />
          </ComponentCard>
          <ComponentCard name="Input">
            <Checkbox disabled />
          </ComponentCard>
          <ComponentCard name="Input">
            <Radio disabled>
              <RadioItem disabled label="Option" />
            </Radio>
          </ComponentCard>
          <ComponentCard name="Input">
            <Select disabled options={[]} />
          </ComponentCard>
        </div>
      </section>

      <section className={styles.workbench}>
        <WorkbenchCard>
          <Input disabled />
        </WorkbenchCard>
        <WorkbenchCard>
          <Checkbox label="Are you sure?" disabled />
        </WorkbenchCard>
      </section>

      <section className={styles.formPreview}>
        <h2 className={styles.formPreview__title}>Form preview</h2>

        <Input />
        <Checkbox label="Are you sure?" />
      </section>
    </div>
  )
}
