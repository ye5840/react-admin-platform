import { Table } from 'antd'
import { useState, useEffect } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import './index.less'

interface tableListProp {
  tableFormRef: objAny
  tableConfig: objAny
}

interface PageState {
  currentPage: number
  pageSize: number
}

const TableList = (props: tableListProp) => {
  const { tableFormRef, tableConfig } = props
  const [tableLoading, setTableLoading] = useState(false)
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<PageState>({ currentPage: 1, pageSize: 10 })
  const [computedTableConfig, setComputedTableConfig] = useState(props.tableConfig)

  console.log(tableFormRef.current, 'tableFormRef.current')

  const handlePageChange = (currentPage: number, pageSize: number) => {
    setTableQuery({ ...tableQuery, currentPage: currentPage, pageSize })
  }

  const fetchData = () => {}

  useEffect(() => {
    fetchData()
  }, [tableQuery])

  useEffect(() => {
    if (!computedTableConfig.columns || computedTableConfig.columns.length === 0) return
    setComputedTableConfig({
      ...computedTableConfig,
      columns: [
        ...computedTableConfig.columns,
        {
          title: () => <SettingOutlined />,
          key: 'action',
          fixed: 'right',
          width: 50
        }
      ]
    })
  }, [])

  return (
    <Table
      rowKey='id'
      loading={tableLoading}
      pagination={{
        current: tableQuery.current,
        pageSize: tableQuery.pageSize,
        total: tableTotal,
        showTotal: () => `Total ${tableTotal} items`,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: handlePageChange
      }}
      {...computedTableConfig}
    ></Table>
  )
}

export default TableList
