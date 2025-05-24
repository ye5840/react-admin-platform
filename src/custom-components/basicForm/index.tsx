import { Form } from 'antd'
import * as componentMap from '@/custom-components/index'

interface BasicFormProp {
  form: objAny
  formJson: objAny
  formData: objAny
  setFormData: Function
}

const BasicForm = (props: BasicFormProp) => {
  const { formConfig, formItemConfig } = props.formJson
  const { setFormData, form, formData } = props
  const hanldeOnValuesChange = () => {
    setFormData({ ...form.getFieldsValue() })
  }
  return (
    <Form form={form} {...formConfig} onValuesChange={hanldeOnValuesChange}>
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
