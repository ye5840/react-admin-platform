import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Select, Table } from 'antd'

const TableSelect: FC = (props: objAny) => {
  const { columns, optionsfiled, data, value, setValue } = props
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [tableSelectInfo, setTableSelectInfo] = useState({
    selectValue: undefined
  })
  let selectOptions = data
  if (optionsfiled?.label && optionsfiled?.value) {
    selectOptions = data.map(item => {
      return {
        ...item,
        label: item[optionsfiled?.label],
        value: item[optionsfiled?.value]
      }
    })
  }

  const onClickRow = (record, rowKey) => {
    if (optionsfiled?.label && optionsfiled?.value) {
      // setTableSelectInfo({
      //   selectValue: record[optionsfiled?.value]
      // })
      console.log(record[optionsfiled?.value], value, setValue, 'value----')
      // value = record[optionsfiled?.value]
      setValue(record[optionsfiled?.value])
      setDropDownOpen(false)
    } else {
      setTableSelectInfo({
        selectValue: record.value
      })
      setDropDownOpen(false)
    }
  }

  const customDropdownRender = useCallback(menu => {
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
      {...props}
      value={value ? value : tableSelectInfo.selectValue}
      dropdownRender={menu => customDropdownRender(menu)}
      onDropdownVisibleChange={setDropDownOpen}
      open={dropDownOpen}
      options={selectOptions}
    ></Select>
  )
}

export default TableSelect
