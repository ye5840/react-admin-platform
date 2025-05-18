import { useState, type FC } from 'react'
import { getJson } from './config'
import TableForm from '@/custom-components/businessForm/tableForm'
import TableList from '@/custom-components/businessTable/tableList'

const getInitFormData = () => ({
  // documentDate: '1',
  // auditStatus: '1',
  // businessType: '1',
  // outgoingDepartment: '1',
  // incomingDepartment: '1',
  // documentSource: '1',
  // documentLabel: '1',
  // queryScope: 'parent 1-0-0'
})
const TransferInventory: FC = () => {
  const [formData, setFormData] = useState(getInitFormData())
  const [options, setOptions] = useState({
    guojiaOptions: [
      { label: '中国', value: 'CN' },
      { label: '美国', value: 'US' },
      { label: '日本', value: 'JP' }
    ],
    shengOptions: [
      { label: '广东省', value: 'GD', parentValue: 'CN' },
      { label: '浙江省', value: 'ZJ', parentValue: 'CN' },
      { label: '江苏省', value: 'JS', parentValue: 'CN' },

      { label: '北京市', value: 'BJ', parentValue: 'CN' },
      { label: '上海市', value: 'SH', parentValue: 'CN' },

      { label: '加利福尼亚州', value: 'CA', parentValue: 'US' },
      { label: '纽约州', value: 'NY', parentValue: 'US' },
      { label: '德克萨斯州', value: 'TX', parentValue: 'US' },

      { label: '东京都', value: 'TK', parentValue: 'JP' },
      { label: '大阪府', value: 'OS', parentValue: 'JP' },
      { label: '北海道', value: 'HK', parentValue: 'JP' }
    ],
    shiOptions: [
      { label: '广州市', value: 'GZ', parentValue: 'GD' },
      { label: '深圳市', value: 'SZ', parentValue: 'GD' },
      { label: '东莞市', value: 'DG', parentValue: 'GD' },

      { label: '杭州市', value: 'HZ', parentValue: 'ZJ' },
      { label: '宁波市', value: 'NB', parentValue: 'ZJ' },
      { label: '温州市', value: 'WZ', parentValue: 'ZJ' },

      { label: '南京市', value: 'NJ', parentValue: 'JS' },
      { label: '苏州市', value: 'SZ', parentValue: 'JS' },
      { label: '无锡市', value: 'WX', parentValue: 'JS' },

      { label: '北京市', value: 'BJ', parentValue: 'BJ' },

      { label: '上海市', value: 'SH', parentValue: 'SH' },

      { label: '洛杉矶', value: 'LA', parentValue: 'CA' },
      { label: '旧金山', value: 'SF', parentValue: 'CA' },

      { label: '纽约市', value: 'NYC', parentValue: 'NY' },
      { label: '布法罗', value: 'BUF', parentValue: 'NY' },

      { label: '东京市', value: 'TKY', parentValue: 'TK' },
      { label: '横滨市', value: 'YOK', parentValue: 'TK' }
    ],
    quOptions: [
      { label: '天河区', value: 'TH', parentValue: 'GZ' },
      { label: '海珠区', value: 'HZ', parentValue: 'GZ' },
      { label: '越秀区', value: 'YX', parentValue: 'GZ' },

      { label: '南山区', value: 'NS', parentValue: 'SZ' },
      { label: '福田区', value: 'FT', parentValue: 'SZ' },
      { label: '罗湖区', value: 'LH', parentValue: 'SZ' },

      { label: '西湖区', value: 'XH', parentValue: 'HZ' },
      { label: '上城区', value: 'SC', parentValue: 'HZ' },
      { label: '下城区', value: 'XC', parentValue: 'HZ' },

      { label: '鼓楼区', value: 'GL', parentValue: 'NJ' },
      { label: '玄武区', value: 'XW', parentValue: 'NJ' },
      { label: '秦淮区', value: 'QH', parentValue: 'NJ' },

      { label: '好莱坞', value: 'HW', parentValue: 'LA' },
      { label: '比佛利山庄', value: 'BFL', parentValue: 'LA' },

      { label: '新宿区', value: 'XS', parentValue: 'TKY' },
      { label: '涩谷区', value: 'SG', parentValue: 'TKY' }
    ]
  })
  const { formJson, tableConfig, api } = getJson({ formData, setFormData, options, setOptions })
  return (
    <>
      <TableForm
        formJson={formJson}
        initFormData={getInitFormData()}
        formData={formData}
        setFormData={setFormData}
      ></TableForm>
      <TableList tableConfig={tableConfig} api={api} formData={formData}></TableList>
    </>
  )
}

export default TransferInventory
