import { useCallback, useState } from 'react'
import { Checkbox, Select, Divider } from 'antd'
import type { CheckboxProps } from 'antd'
import styles from './index.module.less'

const CheckboxGroup = Checkbox.Group

const CheckboxSelect = (props: objAny) => {
  const [checkboxSelectInfo, setCheckboxSelectInfo] = useState({
    checkedList: [],
    value: []
  })

  const handleOnChange = (list: any) => {
    console.log(list)
    setCheckboxSelectInfo({
      checkedList: list,
      value: list
    })
  }

  const handleCheckAllChange = () => {
    setCheckboxSelectInfo({
      checkedList: props.options.map((item: { value: any }) => item.value),
      value: props.options.map((item: { value: any }) => item.value)
    })
  }

  const handleNotChecked = () => {
    setCheckboxSelectInfo({
      checkedList: [],
      value: []
    })
  }

  const handleAgainstSelectChange = () => {
    const list = props.options.filter((item: { value: any }) => !checkboxSelectInfo.checkedList.includes(item.value))
    const valueList = list.map(item => item.value)
    setCheckboxSelectInfo({
      checkedList: valueList,
      value: valueList
    })
  }

  const handleSelectChange = (list: any) => {
    setCheckboxSelectInfo({
      checkedList: list,
      value: list
    })
  }

  const handleSelectClear = () => {
    handleNotChecked()
  }

  const customDropdownRender = useCallback(() => {
    return (
      <>
        <div className={styles['checkbox-operate-wrapper']}>
          <div onClick={handleCheckAllChange}>全选</div>
          <div onClick={handleAgainstSelectChange}>反选</div>
          <div onClick={handleNotChecked}>无</div>
          <div>
            已选 {checkboxSelectInfo.value.length} / {props.options.length}
          </div>
        </div>
        <Divider style={{ margin: '8px 0' }} />
        <CheckboxGroup
          options={props.options}
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
      {...props}
      dropdownRender={menu => customDropdownRender(menu)}
      value={checkboxSelectInfo.value}
      onChange={handleSelectChange}
      onClear={handleSelectClear}
    ></Select>
  )
}

export default CheckboxSelect
