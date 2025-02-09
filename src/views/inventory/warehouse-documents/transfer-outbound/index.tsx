import { useEffect, useRef, type FC } from 'react'
import { getJson } from './confg'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'
import './index.less'

const { formJson, cardConfig, tableConfig } = getJson()
const TransferOutbound: FC = () => {
  const tableFormRef = useRef<any>()
  useEffect(() => {
    console.log(tableFormRef.current)
  }, [])
  return (
    <>
      <TableForm formRef={tableFormRef} formJson={formJson} name='transferOutbound'></TableForm>
      <TableList tableFormRef={tableFormRef} tableConfig={tableConfig}></TableList>
    </>
  )
}

export default TransferOutbound
