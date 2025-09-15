import { TInput } from '@/shared/types/inputs'
import {
  Checkbox,
  Input,
  Radio,
  Select,
  SelectItem,
  RadioItem,
} from '@/shared/ui'

export const WorkbenchCardContent = (props: TInput) => {
  return (
    <>
      {props.type === 'input' ? (
        <Input {...props.params} disabled />
      ) : props.type === 'checkbox' ? (
        <Checkbox
          {...props.params}
          label={props.params.label}
          checked={props.params.value}
          disabled
        />
      ) : props.type === 'radio' ? (
        <Radio {...props.params} disabled>
          {props.options.map((item) => (
            <RadioItem key={item} value={item}>
              {item}
            </RadioItem>
          ))}
        </Radio>
      ) : props.type === 'select' ? (
        <Select {...props.params} disabled>
          {props.options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
      ) : (
        <p>component not found</p>
      )}
    </>
  )
}
