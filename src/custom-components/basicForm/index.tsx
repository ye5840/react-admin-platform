import { Form } from 'antd'
import { componentMap } from '@/custom-components/index'

interface BasicFormProp {
  form: objAny
  formJson: objAny
  formData: objAny
  setFormData: Function
}

const BasicForm = (props: BasicFormProp) => {
  const { formConfig, formItemConfig } = props.formJson
  const { setFormData, form } = props
  const hanldeOnValuesChange = () => {
    setFormData(form.getFieldsValue())
  }
  return (
    <Form form={form} {...formConfig} onValuesChange={hanldeOnValuesChange}>
      {Object.keys(formItemConfig || []).map(key => {
        const Component = componentMap.get(formItemConfig[key]?.type)
        return (
          <Form.Item {...formItemConfig[key]} key={key}>
            {Component && <Component {...formItemConfig[key].component} labelName={formItemConfig[key].label} />}
          </Form.Item>
        )
      })}
    </Form>
  )
}

export default BasicForm
