import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { ContentWrap } from '@/components/ContentWrap'
import { SettingOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/stores'
import { useRequest } from 'ahooks'
import './index.less'

interface tableListProp {
  tableConfig: objAny
  api: objAny
  formData: objAny
  useTableListDataSource: Function
  getTableListAttribute?: Function
  initialCheck?: any[]
}

interface PaginationParams {
  currentPage: number
  pageSize: number
}

interface resultDataType extends PaginationParams {
  list: any[]
  total: number
  totalPages: number
}

const TableList: React.FC<tableListProp> = ({
  tableConfig,
  api,
  formData,
  useTableListDataSource,
  getTableListAttribute,
  initialCheck
}) => {
  const { tableHeight } = useAppSelector((state: { app: any }) => state.app)
  const { dataSource, setDataSource } = useTableListDataSource()
  const [tabelListSelectedRowKeys, setTabelListSelectedRowKeys] = useState<React.Key[]>([])
  const [storeTabelListSelectedRowKeys, setStoreTabelListSelectedRowKeys] = useState<React.Key[]>([])

  // 合并分页和查询条件的状态
  const [queryParams, setQueryParams] = useState<PaginationParams>({
    currentPage: 1,
    pageSize: 10
  })

  const { loading, data, run } = useRequest<resultDataType, any>((params: any) => api.list(params), {
    manual: true, // 手动控制
    defaultParams: [queryParams],
    onSuccess: (result: { list: any; total: any }) => {
      // 成功回调处理
      setComponentTableProp(prev => ({
        ...prev,
        dataSource: result?.list,
        pagination: {
          ...prev.pagination,
          total: result?.total || 0,
          showTotal: () => `总条数为 ${result?.total || 0} `
        }
      }))
      setDataSource(result?.list)
    }
  })

  const handlePageChange = async (currentPage: number, pageSize: number) => {
    const newParams = {
      ...queryParams,
      currentPage,
      pageSize
    }
    // 更新分页配置
    setComponentTableProp(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: currentPage,
        pageSize: pageSize,
        total: data?.total || prev.pagination.total || 0,
        showTotal: () => `总条数为 ${data?.total || prev.pagination.total || 0} `
      }
    }))
    setQueryParams(newParams)
    run(newParams)
  }

  const handleSelectedRowKeysTabelChange = (newSelectedRowKeys: React.Key[], o: React.Key[]) => {
    setTabelListSelectedRowKeys(newSelectedRowKeys)
  }

  const handleSelectedRowKeysTableSelect = (record: any, selected: boolean) => {
    if (selected) {
      setStoreTabelListSelectedRowKeys(prev => {
        const next = Array.from(new Set([...prev, record.id]))
        return next
      })
    } else {
      setStoreTabelListSelectedRowKeys(prev => prev.filter(key => key !== record.id))
    }
  }

  const initTableProp = {
    ...tableConfig,
    columns: [
      ...tableConfig.columns,
      {
        title: () => <SettingOutlined />,
        key: 'action',
        fixed: 'right',
        width: 30
      }
    ],
    dataSource,
    pagination: {
      current: queryParams.currentPage,
      pageSize: queryParams.pageSize,
      total: data?.total || 0,
      showTotal: () => `总条数为 ${data?.total || 0} `,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: handlePageChange
    },
    rowSelection: {
      ...tableConfig.rowSelection,
      onChange: handleSelectedRowKeysTabelChange,
      onSelect: handleSelectedRowKeysTableSelect
    }
  }

  const [componentTableProp, setComponentTableProp] = useState({ ...initTableProp })

  useEffect(() => {
    // 日志在状态变更后打印，避免闭包读取旧值
    const checkValue = dataSource
      .filter((item: { id: React.Key }) => storeTabelListSelectedRowKeys?.includes(item.id))
      .map(item => item.id)
    setComponentTableProp(prev => ({
      ...prev,
      rowSelection: {
        ...prev.rowSelection,
        selectedRowKeys: checkValue
      }
    }))
  }, [storeTabelListSelectedRowKeys, dataSource])

  useEffect(() => {
    run({ ...queryParams, ...formData }) // 在 useEffect 中触发请求
  }, [formData]) // 空依赖数组，只在组件挂载时请求一次

  useEffect(() => {
    getTableListAttribute?.({ componentTableProp, tabelListSelectedRowKeys, storeTabelListSelectedRowKeys })
  }, [
    componentTableProp,
    setComponentTableProp,
    tabelListSelectedRowKeys,
    setTabelListSelectedRowKeys,
    storeTabelListSelectedRowKeys,
    setStoreTabelListSelectedRowKeys
  ])

  useEffect(() => {
    if (!initialCheck || initialCheck.length === 0) return
    const rowKeys: React.Key[] = []
    initialCheck.forEach(item => {
      if (storeTabelListSelectedRowKeys.includes(item)) return
      rowKeys.push(item)
    })
    setStoreTabelListSelectedRowKeys([...storeTabelListSelectedRowKeys, ...rowKeys])
  }, [initialCheck])

  return (
    <ContentWrap>
      <Table
        rowKey='id'
        loading={loading}
        {...componentTableProp}
        scroll={{ ...((componentTableProp as any).scroll || {}), y: tableHeight }}
      ></Table>
    </ContentWrap>
  )
}

export default React.memo(TableList)
