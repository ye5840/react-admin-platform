import { useEffect, useRef, type FC } from 'react'
import { getJson } from './config'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'
import './index.less'

const { formJson, cardConfig, tableConfig } = getJson()
const TransferInventory: FC = () => {
  const tableFormRef = useRef<any>()
  useEffect(() => {
    console.log(tableFormRef.current)
  }, [])
  return (
    <>
      <TableForm formRef={tableFormRef} formJson={formJson} name='transferInventory'></TableForm>
      <TableList tableFormRef={tableFormRef} tableConfig={tableConfig}></TableList>
    </>
  )
}

export default TransferInventory
