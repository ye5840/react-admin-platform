import { ContentWrap } from '@/components/ContentWrap'
import TableButton from '@/custom-components/businessButton/tableButton'
import BasicForm from '@/custom-components/basicForm'
import './index.less'

interface TableFormProp {
  formJson: objAny
  name: string // 全局唯一且固定
  cardConfig?: objAny
  formRef: objAny
}

const TableForm = (props: TableFormProp) => {
  const { formJson, cardConfig, name, formRef } = props

  return (
    <>
      <TableButton formRef={formRef}></TableButton>
      <ContentWrap {...cardConfig} name={name + 'Card'}>
        <BasicForm formRef={formRef} formJson={formJson} name={name + 'Form'}></BasicForm>
      </ContentWrap>
    </>
  )
}

export default TableForm
