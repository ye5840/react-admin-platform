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
}

interface PaginationParams {
  currentPage: number
  pageSize: number
}

interface QueryParams extends PaginationParams {
  [key: string]: unknown // 动态表单值
}

interface resultDataType extends PaginationParams {
  list: any[]
  total: number
  totalPages: number
}

const TableList: React.FC<tableListProp> = ({ tableConfig, api, formData }) => {
  const { tableHeight } = useAppSelector(state => state.app)

  // 合并分页和查询条件的状态
  const [queryParams, setQueryParams] = useState<PaginationParams>({
    currentPage: 1,
    pageSize: 10
  })

  const { loading, data, run } = useRequest<resultDataType, any>(params => api.list(params), {
    manual: true, // 手动控制
    defaultParams: [queryParams],
    onSuccess: result => {
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
    }
  })

  const handlePageChange = (currentPage: number, pageSize: number) => {
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

  const [componentTableProp, setComponentTableProp] = useState({
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
    pagination: {
      current: queryParams.currentPage,
      pageSize: queryParams.pageSize,
      total: data?.total || 0,
      showTotal: () => `总条数为 ${data?.total || 0} `,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: handlePageChange
    }
  })

  useEffect(() => {
    run({ ...queryParams, ...formData }) // 在 useEffect 中触发请求
  }, [formData]) // 空依赖数组，只在组件挂载时请求一次

  return (
    <ContentWrap>
      <Table
        rowKey='id'
        loading={loading}
        {...componentTableProp}
        scroll={{ ...componentTableProp.scroll, y: tableHeight }}
      ></Table>
    </ContentWrap>
  )
}

export default React.memo(TableList)
