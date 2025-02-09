import { Form } from 'antd'
import { componentMap } from '@/custom-components/index'

interface BasicFormProp {
  formJson: objAny
  name: string
  formRef: objAny
}

const BasicForm = (props: BasicFormProp) => {
  const { name, formRef } = props
  const { formConfig, formItemConfig } = props.formJson
  const [form] = Form.useForm()
  return (
    <Form ref={formRef} {...formConfig} className={name}>
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
