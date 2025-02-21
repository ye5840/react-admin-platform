import { useEffect, useRef, type FC } from 'react'
import { getJson } from './confg'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'

const { formJson, cardConfig, tableConfig } = getJson()
const TransferOutbound: FC = () => {
  const tableFormRef = useRef<any>()
  useEffect(() => {
    console.log(tableFormRef.current)
  }, [])
  return (
    <>
      <TableForm name='transferOutbound' formRef={tableFormRef} formJson={formJson}></TableForm>
      <TableList tableFormRef={tableFormRef} tableConfig={tableConfig}></TableList>
    </>
  )
}

export default TransferOutbound
