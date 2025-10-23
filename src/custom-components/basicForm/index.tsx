import { Form } from 'antd'
import * as componentMap from '@/custom-components/index'

interface BasicFormProp {
  form: objAny
  formJson: objAny
  useForm: {
    formData: objAny
    setFormData: Function
  }
}

const BasicForm = (props: BasicFormProp) => {
  const { formConfig, formItemConfig } = props.formJson
  const { useForm, form, formData } = props
  const hanldeOnValuesChange = () => {
    useForm.setFormData({ ...form.getFieldsValue() })
  }
  return (
    <Form className={'mycomponents'} form={form} {...formConfig} onValuesChange={hanldeOnValuesChange}>
      {Object.keys(formItemConfig || []).map(key => {
        const Component = componentMap[formItemConfig[key]?.type]
        return (
          <Form.Item {...formItemConfig[key]} key={key}>
            {Component && <Component {...formItemConfig[key].component} labelName={formItemConfig[key].labelName} />}
          </Form.Item>
        )
      })}
    </Form>
  )
}

export default BasicForm
