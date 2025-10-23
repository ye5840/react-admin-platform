import { useState, type FC } from 'react'
import { getJson } from './config'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'

interface formType {
  documentDate?: string
  auditStatus?: string
  businessType?: string
  outgoingDepartment?: string
  incomingDepartment?: string
  documentSource?: string
  documentLabel?: string
  queryScope?: string
  transferStatus?: string
  discrepancyHandlingStatus?: string
  // documentDate: '1',
  // auditStatus: '1',
  // businessType: '1',
  // outgoingDepartment: '1',
  // incomingDepartment: '1',
  // documentSource: '1',
  // documentLabel: '1',
  // queryScope: 'parent 1-0-0',
  // transferStatus: '1',
  // discrepancyHandlingStatus: '1'
}

interface listType {}
const getInitFormData = (): formType => ({})

const getInitListData = (): listType[] => []
const TransferOutbound: FC = () => {
  const [formData, setFormData] = useState<formType>(getInitFormData())
  const [dataSource, setDataSource] = useState<listType[]>(getInitListData())
  const { formJson, tableConfig, api } = getJson({ formData, setFormData })
  return (
    <>
      <TableForm formJson={formJson} initFormData={getInitFormData()} useForm={{ formData, setFormData }}></TableForm>
      <TableList
        formData={formData}
        tableConfig={tableConfig}
        api={api}
        useDataSource={{ dataSource, setDataSource }}
      ></TableList>
    </>
  )
}

export default TransferOutbound
