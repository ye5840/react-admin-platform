import { ContentWrap } from '@/components/ContentWrap'
import TableButton from '@/custom-components/businessButton/tableButton'
import BasicForm from '@/custom-components/basicForm'

const TableForm = (props: objAny) => {
  const { formJson } = props

  return (
    <>
      <TableButton></TableButton>
      <ContentWrap>
        <BasicForm formJson={formJson}></BasicForm>
      </ContentWrap>
    </>
  )
}

export default TableForm
