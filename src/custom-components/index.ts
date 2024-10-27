import CustomCheckbox from './custom-checkbox/index'
import CustomInput from './custom-input/index'
import CustomSelect from './custom-select/index'
import CustomTreeSelect from './custom-treeSelect/index'
import TreeSelectInput from '@/custom-components/businessInput/treeSelectInput'
import DateRangeInput from '@/custom-components/businessInput/dateRangeInput'
import CheckboxSelect from '@/custom-components/businessSelect/checkboxSelect'
import TableSelect from '@/custom-components/businessSelect/tableSelect'

export const componentMap = new Map<string, React.FC<any>>([
  ['checkbox', CustomCheckbox],
  ['input', CustomInput],
  ['select', CustomSelect],
  ['treeSelect', CustomTreeSelect],
  /* 以上是antd组件 */
  /* 以下是自定义组件 */
  ['treeSelectInput', TreeSelectInput],
  ['dateRangeInput', DateRangeInput],
  ['checkboxSelect', CheckboxSelect],
  ['tableSelect', TableSelect]
])
