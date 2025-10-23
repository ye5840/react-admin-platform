import { Form } from 'antd'
import { ContentWrap } from '@/components/ContentWrap'
import TableButton from '@/custom-components/businessButton/tableButton'
import BasicForm from '@/custom-components/basicForm'
import './index.less'

interface TableFormProp {
  formJson: objAny
  cardConfig?: objAny
  useForm: {
    formData: objAny
    setFormData: Function
  }
  initFormData: objAny
}

const TableForm = (props: TableFormProp) => {
  const { formJson, cardConfig, useForm, initFormData } = props
  const [form] = Form.useForm()

  return (
    <div className='tableForm'>
      <TableButton form={form} initFormData={initFormData} setFormData={useForm.setFormData}></TableButton>
      <ContentWrap {...cardConfig}>
        <BasicForm form={form} formJson={formJson} useForm={useForm}></BasicForm>
      </ContentWrap>
    </div>
  )
}

export default TableForm
