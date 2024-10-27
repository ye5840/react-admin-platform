import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Select, Table } from 'antd'

const TableSelect: FC = (props: objAny) => {
  const { columns, optionsFiled, data } = props
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const [tableSelectInfo, setTableSelectInfo] = useState({
    selectValue: undefined
  })
  let selectOptions = data
  if (optionsFiled.label && optionsFiled.value) {
    selectOptions = data.map(item => {
      return {
        ...item,
        label: item[optionsFiled.label],
        value: item[optionsFiled.value]
      }
    })
  }

  const onClickRow = (record, rowKey) => {
    console.log(record, rowKey)
    if (optionsFiled.label && optionsFiled.value) {
      setTableSelectInfo({
        selectValue: record[optionsFiled.value]
      })
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
      value={tableSelectInfo.selectValue}
      dropdownRender={menu => customDropdownRender(menu)}
      onDropdownVisibleChange={setDropDownOpen}
      open={dropDownOpen}
      options={selectOptions}
    ></Select>
  )
}

export default TableSelect
