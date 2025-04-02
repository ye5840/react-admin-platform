import { ContentWrap } from '@/components/ContentWrap'
import TableButton from '@/custom-components/businessButton/tableButton'
import BasicForm from '@/custom-components/basicForm'
import './index.less'

interface TableFormProp {
  formJson: objAny
  cardConfig?: objAny
  formData: objAny
  setFormData: Function
}

const TableForm = (props: TableFormProp) => {
  const { formJson, cardConfig, formData, setFormData } = props

  return (
    <div className='tableForm'>
      <TableButton></TableButton>
      <ContentWrap {...cardConfig}>
        <BasicForm formJson={formJson} formData={formData} setFormData={setFormData}></BasicForm>
      </ContentWrap>
    </div>
  )
}

export default TableForm
