import type { FC } from 'react'
import { getJson } from './confg'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'

const { formJson } = getJson()
const TransferOutbound: FC = () => {
  return (
    <>
      <TableForm formJson={formJson}></TableForm>
      <TableList></TableList>
    </>
  )
}

export default TransferOutbound
