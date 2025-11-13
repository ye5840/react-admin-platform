import { Modal, Select, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import BasicForm from '@/custom-components/basicForm'
import TableList from '@/custom-components/businessTable/tableList'
import { useState, useEffect } from 'react'
import { useForm } from 'antd/es/form/Form'
import './index.less'

interface TableSelectProp {
  labelName: string
  [x: string]: any
}
const TableSelect = (props: TableSelectProp) => {
  const { labelName, modalConfig, tableConfig, formJson, value, setValue, api, optionsFieds, ...rest } = props

  const [formData, setFormData] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [form] = useForm()
  const [tableModalSelectInfo, setTableModalSelectInfo] = useState({
    selectAndTableCheckedvalue: setValue ? value : rest.mode === 'multiple' ? [] : '',
    labels: rest.mode === 'multiple' ? [] : '',
    isModalOpen: false,
    selectedRows: [],
    compOptions: []
  })

  const rowSelection = {
    type: rest.mode === 'multiple' ? 'checkbox' : 'radio',
    onChange: (_rowKeys: any, _rows: any) => {}
  }

  const getOptions = async () => {
    const res = await api.list({ currentPage: 1, pageSize: 99999999999 })
    const ops = res.list.map((item: { [x: string]: any }) => ({
      ...item,
      label: item[optionsFieds.label],
      value: item[optionsFieds.value]
    }))
    setTableModalSelectInfo(prev => ({
      ...prev,
      compOptions: ops
    }))
  }

  const [newestTableListAttribute, setNewestTableListAttribute] = useState({})

  const handleOk = val => {
    console.log(val, 'val---')
    setTableModalSelectInfo(prev => ({
      ...prev,
      isModalOpen: false,
      selectAndTableCheckedvalue: newestTableListAttribute.storeTabelListSelectedRowKeys
    }))
  }

  const openModal = () => {
    setTableModalSelectInfo(prev => ({
      ...prev,
      isModalOpen: true
    }))
  }

  const closeModal = () => {
    setTableModalSelectInfo(prev => ({
      ...prev,
      isModalOpen: false
    }))
  }

  const handleTableModalSelectChange = (val: any) => {
    if (rest.mode === 'multiple') {
      const labels = tableModalSelectInfo.compOptions
        .filter(item => val.includes(item[optionsFieds.value]))
        .map(item => item[optionsFieds.label])
      setValue(val)
      setTableModalSelectInfo(prev => ({
        ...prev,
        selectAndTableCheckedvalue: val,
        labels
      }))
    }
  }

  const getTableListAttribute = val => {
    setNewestTableListAttribute(val)
  }

  useEffect(() => {
    getOptions()
  }, [])

  useEffect(() => {
    handleTableModalSelectChange(tableModalSelectInfo.selectAndTableCheckedvalue)
  }, [tableModalSelectInfo.selectAndTableCheckedvalue])
  return (
    <>
      <Tooltip placement='top' title={tableModalSelectInfo.labels.toString()}>
        <Select
          placeholder={`请选择${labelName}`}
          options={tableModalSelectInfo.compOptions}
          value={tableModalSelectInfo.selectAndTableCheckedvalue}
          suffixIcon={<SearchOutlined onClick={openModal} />}
          {...rest}
          onChange={handleTableModalSelectChange}
        ></Select>
      </Tooltip>
      <Modal
        open={tableModalSelectInfo.isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        width={960}
        cancelText={'取消'}
        okText={'确认'}
        {...modalConfig}
      >
        <BasicForm
          className={'selectModalForm'}
          form={form}
          formJson={formJson}
          useBasicForm={() => ({ formData, setFormData })}
        ></BasicForm>
        <TableList
          getTableListAttribute={getTableListAttribute}
          tableConfig={{ rowSelection, ...tableConfig }}
          api={api}
          formData={formData}
          useTableListDataSource={() => ({ dataSource, setDataSource })}
          initialCheck={tableModalSelectInfo.selectAndTableCheckedvalue}
        ></TableList>
      </Modal>
    </>
  )
}

export default TableSelect
