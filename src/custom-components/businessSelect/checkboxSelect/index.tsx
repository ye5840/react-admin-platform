import { useCallback, useState } from 'react'
import { Checkbox, Select, Divider } from 'antd'
import './index.less'

const CheckboxGroup = Checkbox.Group

const CheckboxSelect = (props: objAny) => {
  const { options, value, setValue, labelName } = props
  const [checkboxSelectInfo, setCheckboxSelectInfo] = useState({
    checkedList: value && setValue ? value?.split(',') : [],
    value: setValue ? value?.split(',') : []
  })

  const handleOnChange = (list: any) => {
    setCheckboxSelectInfo({
      checkedList: list,
      value: list
    })
    setValue?.(list)
  }

  const handleCheckAllChange = () => {
    const list = options.map((item: { value: any }) => item.value)
    setCheckboxSelectInfo({
      checkedList: list,
      value: list
    })
    setValue?.(list)
  }

  const handleNotChecked = () => {
    setCheckboxSelectInfo({
      checkedList: [],
      value: []
    })
    setValue?.([])
  }

  const handleAgainstSelectChange = () => {
    const list = options.filter((item: { value: any }) => !checkboxSelectInfo.checkedList.includes(item.value))
    const valueList = list.map(item => item.value)
    setCheckboxSelectInfo({
      checkedList: valueList,
      value: valueList
    })
    setValue?.(valueList)
  }

  const handleSelectChange = (list: any) => {
    setCheckboxSelectInfo({
      checkedList: list,
      value: list
    })
    setValue?.(list)
  }

  const handleSelectClear = () => {
    handleNotChecked()
  }

  const customDropdownRender = useCallback(() => {
    return (
      <>
        <div className='checkbox-operate-wrapper'>
          <div onClick={handleCheckAllChange}>全选</div>
          <div onClick={handleAgainstSelectChange}>反选</div>
          <div onClick={handleNotChecked}>无</div>
          <div>
            已选 {checkboxSelectInfo.value?.length || 0} / {options.length}
          </div>
        </div>
        <Divider style={{ margin: '8px 0' }} />
        <CheckboxGroup
          options={options}
          value={checkboxSelectInfo.checkedList}
          onChange={handleOnChange}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start'
          }}
        />
      </>
    )
  }, [checkboxSelectInfo.checkedList])

  return (
    <Select
      placeholder={`请选择${labelName}`}
      {...props}
      dropdownRender={menu => customDropdownRender(menu)}
      value={checkboxSelectInfo.value}
      onChange={handleSelectChange}
      onClear={handleSelectClear}
    ></Select>
  )
}

export default CheckboxSelect
