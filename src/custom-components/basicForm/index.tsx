import { Form } from 'antd'
import * as componentMap from '@/custom-components/index'
import { memo, useCallback } from 'react'

interface BasicFormProp {
  form: objAny
  formJson: objAny
  useBasicForm: Function
  className: string
}

const BasicForm = (props: BasicFormProp) => {
  const { formConfig, formItemConfig } = props.formJson
  const { useBasicForm, form, className } = props
  const { setFormData } = useBasicForm()
  const hanldeOnValuesChange = useCallback(() => {
    setFormData({ ...form.getFieldsValue() })
  }, [setFormData])
  return (
    <Form form={form} {...formConfig} onValuesChange={hanldeOnValuesChange} className={className}>
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

export default memo(BasicForm)
