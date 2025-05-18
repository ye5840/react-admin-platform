import { Select } from 'antd'

interface CustomSelectProp {
  labelName: string
  [x: string]: any
}
const CustomSelect = (props: CustomSelectProp) => {
  const { labelName, ...rest } = props

  return <Select placeholder={`请选择${labelName}`} {...rest}></Select>
}

export default CustomSelect
