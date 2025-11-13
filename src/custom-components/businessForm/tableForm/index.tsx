import { Form } from 'antd'
import { ContentWrap } from '@/components/ContentWrap'
import TableButton from '@/custom-components/businessButton/tableButton'
import BasicForm from '@/custom-components/basicForm'
import './index.less'

interface TableFormProp {
  formJson: objAny
  cardConfig?: objAny
  useTableForm: Function
  initFormData: objAny
}

const TableForm = (props: TableFormProp) => {
  const { formJson, cardConfig, useTableForm, initFormData } = props
  const [form] = Form.useForm()
  const { setFormData } = useTableForm()

  return (
    <div className='tableForm'>
      <TableButton form={form} initFormData={initFormData} setFormData={setFormData}></TableButton>
      <ContentWrap {...cardConfig}>
        <BasicForm className={'mycomponents'} form={form} formJson={formJson} useBasicForm={useTableForm}></BasicForm>
      </ContentWrap>
    </div>
  )
}

export default TableForm
