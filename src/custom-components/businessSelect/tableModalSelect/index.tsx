import { Modal, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import BasicForm from '@/custom-components/basicForm'
import TableList from '@/custom-components/businessTable/tableList'
import './index.less'
import { useState, useEffect } from 'react'
import { useForm } from 'antd/es/form/Form'

interface TableSelectProp {
  labelName: string
  [x: string]: any
}
const TableSelect = (props: TableSelectProp) => {
  const { labelName, modalConfig, tableConfig, formJson, value, setValue, api, optionsFieds, ...rest } = props

  const [formData, setFormData] = useState({})
  const [form] = useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [srks, setSelectedRowKeys] = useState([])
  const [tableSelectInfo, setTableSelectInfo] = useState({
    value: setValue ? value : ''
  })
  const [rowSelection, setRowSelection] = useState({
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  })

  const [options, setOptions] = useState([])

  const getOptions = async () => {
    const res = await api.list({ currentPage: 1, pageSize: 99999999999 })
    const ops = res.list.map((item: { [x: string]: any }) => ({
      ...item,
      label: item[optionsFieds.label],
      value: item[optionsFieds.value]
    }))
    setOptions(ops)
  }

  const handleOk = () => {
    const value = rest.mode === 'multiple' ? srks : srks[0]
    setValue(value)
    setTableSelectInfo({
      value
    })
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (!rest.mode) {
      setRowSelection(prev => ({
        ...prev,
        type: 'radio'
      }))
    }
    if (rest.mode === 'multiple') {
      setRowSelection(prev => ({
        ...prev,
        type: 'checkbox'
      }))
    }
  }, [])

  useEffect(() => {
    getOptions()
  }, [])
  return (
    <>
      <Select
        placeholder={`请选择${labelName}`}
        {...rest}
        options={options}
        value={tableSelectInfo.value}
        suffixIcon={<SearchOutlined onClick={() => setIsModalOpen(true)} />}
      ></Select>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={960}
        cancelText={'取消'}
        okText={'确认'}
        {...modalConfig}
      >
        <BasicForm form={form} formJson={formJson} formData={formData} setFormData={setFormData}></BasicForm>
        <TableList tableConfig={{ rowSelection, ...tableConfig }} api={api} formData={formData}></TableList>
      </Modal>
    </>
  )
}

export default TableSelect
