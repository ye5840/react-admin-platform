import { Form } from 'antd'
import { componentMap } from '@/custom-components/index'

interface BasicFormProp {
  formJson: objAny
  formData: objAny
  setFormData: Function
}

const BasicForm = (props: BasicFormProp) => {
  const { formConfig, formItemConfig } = props.formJson
  const { setFormData } = props
  const [form] = Form.useForm()
  const hanldeOnValuesChange = () => {
    console.log(form.getFieldsValue(), 'form.getFieldsValue()')
    setFormData(form.getFieldsValue())
  }
  return (
    <Form form={form} {...formConfig} onValuesChange={hanldeOnValuesChange}>
      {Object.keys(formItemConfig || []).map(key => {
        const Component = componentMap.get(formItemConfig[key]?.type)
        return (
          <Form.Item {...formItemConfig[key]} key={key}>
            {Component && <Component {...formItemConfig[key].component} />}
          </Form.Item>
        )
      })}
    </Form>
  )
}

export default BasicForm
