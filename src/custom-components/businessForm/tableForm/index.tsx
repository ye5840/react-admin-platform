import { Form } from 'antd'
import { ContentWrap } from '@/components/ContentWrap'
import TableButton from '@/custom-components/businessButton/tableButton'
import BasicForm from '@/custom-components/basicForm'
import './index.less'

interface TableFormProp {
  formJson: objAny
  cardConfig?: objAny
  formData: objAny
  setFormData: Function
  initFormData: objAny
}

const TableForm = (props: TableFormProp) => {
  const { formJson, cardConfig, formData, setFormData, initFormData } = props
  const [form] = Form.useForm()

  return (
    <div className='tableForm'>
      <TableButton form={form} initFormData={initFormData} setFormData={setFormData}></TableButton>
      <ContentWrap {...cardConfig}>
        <BasicForm form={form} formJson={formJson} formData={formData} setFormData={setFormData}></BasicForm>
      </ContentWrap>
    </div>
  )
}

export default TableForm
