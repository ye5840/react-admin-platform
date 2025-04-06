import type { FC } from 'react'
import { Select } from 'antd'

const CustomSelect: FC = (props: objAny) => {
  const { labelName } = props
  return <Select placeholder={`请选择${labelName}`} {...props}></Select>
}

export default CustomSelect
