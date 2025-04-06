import { useState, type FC } from 'react'
import { getJson } from './config'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'

const getInitFormData = () => ({
  documentDate: '1',
  auditStatus: '1',
  businessType: '1',
  outgoingDepartment: '1',
  incomingDepartment: '1',
  documentSource: '1',
  documentLabel: '1',
  queryScope: 'parent 1-0-0'
})
const TransferInventory: FC = () => {
  const [formData, setFormData] = useState(getInitFormData())
  const { formJson, tableConfig, api } = getJson({ formData, setFormData })
  return (
    <>
      <TableForm
        formJson={formJson}
        initFormData={getInitFormData()}
        formData={formData}
        setFormData={setFormData}
      ></TableForm>
      <TableList tableConfig={tableConfig} api={api} formData={formData}></TableList>
    </>
  )
}

export default TransferInventory
