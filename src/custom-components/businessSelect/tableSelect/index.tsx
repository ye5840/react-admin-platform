import { useCallback, useEffect, useState } from 'react'
import { Select, Table } from 'antd'
import type { AnyObject } from 'antd/es/_util/type'

interface TableSelectProp {
  columns: any[]
  optionsfiled?: { label: string; value: string }
  data: any[]
  value: any
  setValue: Function
  [x: string]: any
}
const TableSelect = (props: TableSelectProp) => {
  const { columns, optionsfiled, data, value, setValue, labelName, ...arg } = props
  const [tableSelectInfo, setTableSelectInfo] = useState({
    selectValue: setValue ? value : undefined,
    selectOptions: [],
    dropDownOpen: false
  })

  const onClickRow = (record: AnyObject, rowKey: number | undefined) => {
    setTableSelectInfo(perv => ({
      ...perv,
      selectValue: optionsfiled?.value ? record[optionsfiled?.value] : record.value,
      dropDownOpen: false
    }))
    if (setValue) {
      setValue(optionsfiled?.value ? record[optionsfiled?.value] : record.value)
    }
  }

  useEffect(() => {
    const selectOptions = data.map((item: { [x: string]: any; label: any; value: any }) => {
      return {
        ...item,
        label: optionsfiled?.label ? item[optionsfiled?.label] : item.label,
        value: optionsfiled?.value ? item[optionsfiled?.value] : item.value
      }
    })
    setTableSelectInfo(perv => ({
      ...perv,
      selectOptions
    }))
  }, [])

  const handleOnClear = () => {
    setTableSelectInfo(perv => ({
      ...perv,
      selectValue: undefined,
      dropDownOpen: false
    }))
    if (setValue) {
      setValue(undefined)
    }
    if (arg.onClear) {
      arg.onClear()
    }
  }

  const customDropdownRender = useCallback((menu: any) => {
    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(record, rowKey) => ({
            onClick: () => onClickRow(record, rowKey)
          })}
        ></Table>
      </>
    )
  }, [])

  return (
    <Select
      placeholder={`请选择${labelName}`}
      {...props}
      value={tableSelectInfo.selectValue}
      dropdownRender={menu => customDropdownRender(menu)}
      onDropdownVisibleChange={val => setTableSelectInfo({ ...tableSelectInfo, dropDownOpen: val })}
      open={tableSelectInfo.dropDownOpen}
      options={tableSelectInfo.selectOptions}
      onClear={handleOnClear}
    ></Select>
  )
}

export default TableSelect
