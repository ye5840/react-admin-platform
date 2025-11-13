import { useState, type FC } from 'react'
import { getJson } from './config'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'

interface formType {}
interface listType {}
const getInitFormData = () => ({
  // documentDate: '1',
  // auditStatus: '1',
  // businessType: '1',
  // outgoingDepartment: '1',
  // incomingDepartment: '1',
  // documentSource: '1',
  // documentLabel: '1',
  // queryScope: 'parent 1-0-0'
})
const getInitListData = (): listType[] => []
const TransferInventory: FC = () => {
  const [formData, setFormData] = useState<formType>(getInitFormData())
  const [dataSource, setDataSource] = useState<listType[]>(getInitListData())
  const { formJson, tableConfig, api } = getJson({ formData, setFormData })
  return (
    <>
      <TableForm
        formJson={formJson}
        initFormData={getInitFormData()}
        useTableForm={() => ({ formData, setFormData })}
      ></TableForm>
      <TableList
        formData={formData}
        tableConfig={tableConfig}
        api={api}
        useTableListDataSource={() => ({ dataSource, setDataSource })}
      ></TableList>
    </>
  )
}

export default TransferInventory
