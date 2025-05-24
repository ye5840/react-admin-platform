import { Modal, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import BasicForm from '@/custom-components/basicForm'
import TableList from '@/custom-components/businessTable/tableList'
import './index.less'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'

interface TableSelectProp {
  labelName: string
  [x: string]: any
}
const TableSelect = (props: TableSelectProp) => {
  const [formData, setFormData] = useState({})
  const [form] = useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {}

  const { labelName, modalConfig, tableConfig, formJson, value, setValue, api, ...rest } = props
  return (
    <>
      <Select
        placeholder={`请选择${labelName}`}
        {...rest}
        suffixIcon={<SearchOutlined onClick={() => setIsModalOpen(true)} />}
      ></Select>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} {...modalConfig}>
        <BasicForm form={form} formJson={formJson} formData={formData} setFormData={setFormData}></BasicForm>
        <TableList tableConfig={tableConfig} api={api} formData={formData}></TableList>
      </Modal>
    </>
  )
}

export default TableSelect
