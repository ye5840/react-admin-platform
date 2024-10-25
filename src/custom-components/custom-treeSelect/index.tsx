import type { FC } from 'react'
import { TreeSelect } from 'antd'

const CustomTreeSelect: FC = (props: objAny) => {
  return <TreeSelect {...props} showCheckedStrategy={TreeSelect.SHOW_ALL}></TreeSelect>
}

export default CustomTreeSelect
