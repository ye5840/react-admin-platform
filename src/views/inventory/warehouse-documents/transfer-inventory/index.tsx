import { useState, type FC } from 'react'
import { getJson } from './config'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'

const TransferInventory: FC = () => {
  const [formData, setFormData] = useState({
    outgoingDepartment: 1
  })
  const { formJson, tableConfig, api } = getJson({ formData, setFormData })
  return (
    <>
      <TableForm formJson={formJson} formData={formData} setFormData={setFormData}></TableForm>
      <TableList tableConfig={tableConfig} api={api} formData={formData}></TableList>
    </>
  )
}

export default TransferInventory
