import { Form } from 'antd'
import { componentMap } from '@/custom-components/index'

interface BasicFormProp {
  formJson: objAny
}

const BasicForm = (props: BasicFormProp) => {
  const { formJson } = props
  const [form] = Form.useForm()
  return (
    <Form>
      {Object.keys(formJson).map(key => {
        const Component = componentMap.get(formJson[key]?.type)
        return (
          <Form.Item {...formJson[key]} key={key}>
            {Component && <Component {...formJson[key].component} />}
          </Form.Item>
        )
      })}
    </Form>
  )
}

export default BasicForm
