import { renderMaxTagPlaceholder } from '@/custom-components/businessTooltip'
import { getTransferInventoryList } from '@/api/inventory/transferInventory'

const widthTypeOne = 100

const widthTypeTwo = 180

export const getJson = ({ formData, setFormData }) => {
  const formJson = {
    formConfig: {
      size: 'small',
      initialValues: formData
    },
    formItemConfig: {
      queryScope: {
        label: '查询范围',
        type: 'treeSelectInput',
        component: {
          treeConfig: {
            treeData: [
              {
                key: 'parent 1',
                title: '基本信息',
                children: [
                  {
                    key: 'parent 1-0',
                    title: '商品分录',
                    children: [
                      {
                        key: 'parent 1-0-0',
                        title: '商品分录0'
                      },
                      {
                        key: 'parent 1-0-1',
                        title: '商品分录1'
                      }
                    ]
                  },
                  {
                    key: 'parent 1-1',
                    title: '物流信息'
                  },
                  {
                    key: 'parent 1-2',
                    title: '配送信息'
                  },
                  {
                    key: 'parent 1-3',
                    title: '交货明细'
                  }
                ]
              },
              {
                key: 'parent 2',
                title: '其他信息',
                children: [
                  {
                    key: 'parent 2-0',
                    title: '其他0'
                  },
                  {
                    key: 'parent 2-1',
                    title: '其他1'
                  },
                  {
                    key: 'parent 2-2',
                    title: '其他2'
                  },
                  {
                    key: 'parent 2-3',
                    title: '其他3'
                  }
                ]
              }
            ]
          },
          size: 'samll',
          value: formData.queryScope,
          setValue: (val: any) => setFormData({ ...formData, queryScope: val })
        },
        name: 'queryScope',
        colon: false,
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      },
      documentDate: {
        label: '单据日期',
        type: 'dateRangeInput',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          options: [
            {
              name: '今天',
              code: '1'
            },
            {
              name: '昨天',
              code: '2'
            }
          ],
          optionsfiled: {
            label: 'name',
            value: 'code'
          },
          value: formData.documentDate,
          setValue: (val: any) => setFormData({ ...formData, documentDate: val })
        },
        name: 'documentDate'
      },
      auditStatus: {
        label: '审核状态',
        type: 'select',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          options: [
            {
              label: '未审核',
              value: '1'
            },
            {
              label: '已审核',
              value: '2'
            }
          ],
          allowClear: true,
          value: formData.auditStatus,
          setValue: (val: any) => setFormData({ ...formData, auditStatus: val })
        },
        name: 'auditStatus'
      },
      businessType: {
        label: '业务类型',
        type: 'select',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          options: [
            {
              label: '同价调拨',
              value: '1'
            },
            {
              label: '异价调拨',
              value: '2'
            }
          ],
          allowClear: true,
          value: formData.businessType,
          setValue: (val: any) => setFormData({ ...formData, businessType: val })
        },
        name: 'businessType'
      },
      outgoingDepartment: {
        label: '调出部门',
        type: 'tableSelect',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          columns: [
            {
              title: '部门编码',
              key: 'deptCode',
              dataIndex: 'deptCode'
            },
            {
              title: '部门名称',
              key: 'deptName',
              dataIndex: 'deptName'
            }
          ],
          optionsfiled: {
            label: 'deptName',
            value: 'deptCode'
          },
          // 可写死也可通过接口请求
          data: [
            {
              id: '0000000001',
              deptCode: '1',
              deptName: '管理中心'
            },
            {
              id: '0000000002',
              deptCode: '2',
              deptName: '成本中心'
            },
            {
              id: '0000000003',
              deptCode: '3',
              deptName: '利润中心'
            }
          ],
          dicturl: '',
          value: formData.outgoingDepartment,
          setValue: (val: any) => setFormData({ ...formData, outgoingDepartment: val }),
          allowClear: true
        },
        name: 'outgoingDepartment'
      },
      incomingDepartment: {
        label: '调入部门',
        type: 'tableSelect',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          columns: [
            {
              title: '部门编码',
              key: 'deptCode',
              dataIndex: 'deptCode'
            },
            {
              title: '部门名称',
              key: 'deptName',
              dataIndex: 'deptName'
            }
          ],
          optionsfiled: {
            label: 'deptName',
            value: 'deptCode'
          },
          // 可写死也可通过接口请求
          data: [
            {
              id: '0000000001',
              deptCode: '1',
              deptName: '管理中心'
            },
            {
              id: '0000000002',
              deptCode: '2',
              deptName: '成本中心'
            },
            {
              id: '0000000003',
              deptCode: '3',
              deptName: '利润中心'
            }
          ],
          dicturl: '',
          value: formData.incomingDepartment,
          setValue: (val: any) => setFormData({ ...formData, incomingDepartment: val }),
          allowClear: true
        },
        name: 'incomingDepartment'
      },
      documentSource: {
        label: '单据来源',
        type: 'checkboxSelect',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          options: [
            {
              label: 'WEB录入',
              value: '1'
            },
            {
              label: '零售',
              value: '2'
            },
            {
              label: 'WEB引入',
              value: '3'
            },
            {
              label: 'APP',
              value: '4'
            },
            {
              label: '小程序',
              value: '5'
            },
            {
              label: '企业微信',
              value: '6'
            },
            {
              label: '第三方',
              value: '7'
            },
            {
              label: '迁移工具',
              value: '8'
            },
            {
              label: '钉钉',
              value: '9'
            },
            {
              label: '结转账套',
              value: '10'
            }
          ],
          mode: 'multiple', // 明确指定类型
          allowClear: true,
          value: formData.documentSource || [],
          setValue: (val: any) => setFormData({ ...formData, documentSource: val.toString() }),
          maxTagCount: 1,
          maxTagPlaceholder: renderMaxTagPlaceholder
        },
        name: 'documentSource'
      },
      documentLabel: {
        label: '单据标签',
        type: 'tableSelect',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          columns: [
            {
              title: '标签名称',
              key: 'labelName',
              dataIndex: 'labelName'
            }
          ],
          optionsfiled: {
            label: 'labelName',
            value: 'labelCode'
          },
          // 可写死也可通过接口请求
          data: [
            {
              id: '0000000001',
              labelCode: '1',
              labelName: '客户未提'
            },
            {
              id: '0000000002',
              labelCode: '2',
              labelName: '测试标签'
            },
            {
              id: '0000000003',
              labelCode: '3',
              labelName: '产品标签'
            }
          ],
          dicturl: '',
          value: formData.documentLabel,
          setValue: (val: any) => setFormData({ ...formData, documentLabel: val }),
          allowClear: true
        },
        name: 'documentLabel'
      }
    }
  }

  const cardConfig = {}

  const tableConfig = {
    columns: [
      { title: '单据日期', dataIndex: 'documentDate', width: widthTypeOne },
      { title: '单据编号', dataIndex: 'documentNumber', width: widthTypeOne },
      { title: '审核状态', dataIndex: 'auditStatus', width: widthTypeOne },
      { title: '业务类型', dataIndex: 'businessType', width: widthTypeOne },
      { title: '调出部门', dataIndex: 'outgoingDepartment', width: widthTypeOne },
      { title: '调入部门', dataIndex: 'incomingDepartment', width: widthTypeOne },
      { title: '调入仓库', dataIndex: 'incomingWarehouse', width: widthTypeTwo },
      { title: '调入仓位', dataIndex: 'incomingLocation', width: widthTypeTwo },
      { title: '经办人', dataIndex: 'handler', width: widthTypeOne },
      { title: '分录行号', dataIndex: 'entryLineNumber', width: widthTypeOne },
      { title: '调出仓库', dataIndex: 'outgoingWarehouse', width: widthTypeTwo },
      { title: '调出仓位', dataIndex: 'outgoingLocation', width: widthTypeTwo },
      { title: '商品图片', dataIndex: 'productImage', width: widthTypeTwo },
      { title: '商品编码', dataIndex: 'productCode', width: widthTypeOne },
      { title: '商品名称', dataIndex: 'productName', width: widthTypeTwo },
      { title: '条形码', dataIndex: 'barcode', width: widthTypeOne },
      { title: '规格型号', dataIndex: 'specificationModel', width: widthTypeTwo },
      { title: '商品类别', dataIndex: 'productCategory', width: widthTypeTwo },
      { title: '品牌', dataIndex: 'brand', width: widthTypeOne },
      { title: '辅助属性', dataIndex: 'auxiliaryAttributes', width: widthTypeTwo },
      { title: 'SKU编码', dataIndex: 'skuCode', width: widthTypeOne },
      { title: '装量', dataIndex: 'packaging', width: widthTypeOne },
      { title: '尺寸', dataIndex: 'size', width: widthTypeOne },
      { title: '等级', dataIndex: 'grade', width: widthTypeOne },
      { title: '颜色', dataIndex: 'color', width: widthTypeOne },
      { title: '编号', dataIndex: 'number', width: widthTypeOne },
      { title: '重量单位', dataIndex: 'weightUnit', width: widthTypeOne },
      { title: '净重', dataIndex: 'netWeight', width: widthTypeOne },
      { title: '总净重', dataIndex: 'totalNetWeight', width: widthTypeOne },
      { title: '毛重', dataIndex: 'grossWeight', width: widthTypeOne },
      { title: '总毛重', dataIndex: 'totalGrossWeight', width: widthTypeOne },
      { title: '体积单位', dataIndex: 'volumeUnit', width: widthTypeOne },
      { title: '体积', dataIndex: 'volume', width: widthTypeOne },
      { title: '总体积', dataIndex: 'totalVolume', width: widthTypeOne },
      { title: '批次', dataIndex: 'batch', width: widthTypeOne },
      { title: '生产日期', dataIndex: 'productionDate', width: widthTypeOne },
      { title: '保质期单位', dataIndex: 'shelfLifeUnit', width: widthTypeOne },
      { title: '保质期', dataIndex: 'shelfLife', width: widthTypeOne },
      { title: '到期日', dataIndex: 'expirationDate', width: widthTypeOne },
      { title: '注册证号', dataIndex: 'registrationNumber', width: widthTypeTwo },
      { title: '生产许可证', dataIndex: 'productionLicense', width: widthTypeTwo },
      { title: '产地', dataIndex: 'origin', width: widthTypeTwo },
      { title: '可用库存', dataIndex: 'availableStock', width: widthTypeOne },
      { title: '即时库存', dataIndex: 'instantStock', width: widthTypeOne },
      { title: '预计可用库存', dataIndex: 'estimatedAvailableStock', width: widthTypeOne },
      { title: '单位', dataIndex: 'unit', width: widthTypeOne },
      { title: '数量', dataIndex: 'quantity', width: widthTypeOne },
      { title: '换算率', dataIndex: 'conversionRate', width: widthTypeOne },
      { title: '辅助单位', dataIndex: 'auxiliaryUnit', width: widthTypeOne },
      { title: '辅助数量', dataIndex: 'auxiliaryQuantity', width: widthTypeOne },
      { title: '基本单位', dataIndex: 'basicUnit', width: widthTypeOne },
      { title: '基本数量', dataIndex: 'basicQuantity', width: widthTypeOne },
      { title: '调入单价', dataIndex: 'incomingUnitPrice', width: widthTypeOne },
      { title: '调入金额', dataIndex: 'incomingAmount', width: widthTypeOne },
      { title: '折扣（折）', dataIndex: 'discount', width: widthTypeOne },
      { title: '零售价', dataIndex: 'retailPrice', width: widthTypeOne },
      { title: '零售金额', dataIndex: 'retailAmount', width: widthTypeOne },
      { title: '基本单位成本', dataIndex: 'basicUnitCost', width: widthTypeOne },
      { title: '单位成本', dataIndex: 'unitCost', width: widthTypeOne },
      { title: '成本', dataIndex: 'cost', width: widthTypeOne },
      { title: '费用分摊比例（%）', dataIndex: 'costSharingRatio', width: widthTypeTwo },
      { title: '调入费用分摊', dataIndex: 'incomingCostSharing', width: widthTypeOne },
      { title: '参考单位成本', dataIndex: 'referenceUnitCost', width: widthTypeOne },
      { title: '关联调拨费用', dataIndex: 'relatedTransferCost', width: widthTypeOne },
      { title: '商品描述', dataIndex: 'productDescription', width: widthTypeTwo },
      { title: '商品行备注', dataIndex: 'productLineRemark', width: widthTypeTwo },
      { title: '调拨费用', dataIndex: 'transferCost', width: widthTypeOne },
      { title: '调拨费用明细', dataIndex: 'transferCostDetails', width: widthTypeTwo },
      { title: '收货地址（联系人）', dataIndex: 'recipientContact', width: widthTypeTwo },
      { title: '收货地址（手机号）', dataIndex: 'recipientPhone', width: widthTypeTwo },
      { title: '收货地址（国家）', dataIndex: 'recipientCountry', width: widthTypeTwo },
      { title: '收货地址（省）', dataIndex: 'recipientProvince', width: widthTypeTwo },
      { title: '收货地址（市）', dataIndex: 'recipientCity', width: widthTypeTwo },
      { title: '收货地址（区）', dataIndex: 'recipientDistrict', width: widthTypeTwo },
      { title: '收货地址', dataIndex: 'recipientAddress', width: widthTypeTwo },
      { title: '凭证字号', dataIndex: 'voucherNumber', width: widthTypeTwo },
      { title: '单据来源', dataIndex: 'documentSource', width: widthTypeOne },
      { title: '源单类型', dataIndex: 'sourceDocumentType', width: widthTypeTwo },
      { title: '源单单号', dataIndex: 'sourceDocumentNumber', width: widthTypeTwo },
      { title: '源单行号', dataIndex: 'sourceDocumentLineNumber', width: widthTypeOne },
      { title: '制单人', dataIndex: 'creator', width: widthTypeOne },
      { title: '制单时间', dataIndex: 'creationTime', width: widthTypeOne },
      { title: '审核人', dataIndex: 'auditor', width: widthTypeOne },
      { title: '审核时间', dataIndex: 'auditTime', width: widthTypeOne },
      { title: '最后修改人', dataIndex: 'lastModifier', width: widthTypeOne },
      { title: '最后修改时间', dataIndex: 'lastModificationTime', width: widthTypeOne },
      { title: '打印次数', dataIndex: 'printCount', width: widthTypeOne },
      { title: '交货方式', dataIndex: 'deliveryMethod', width: widthTypeTwo },
      { title: '物流公司', dataIndex: 'logisticsCompany', width: widthTypeTwo },
      { title: '物流单号', dataIndex: 'logisticsNumber', width: widthTypeTwo },
      { title: '发货时间', dataIndex: 'shippingTime', width: widthTypeOne },
      { title: '物流备注', dataIndex: 'logisticsRemark', width: widthTypeTwo },
      { title: '物流分录行号', dataIndex: 'logisticsEntryLineNumber', width: widthTypeOne },
      { title: '单据备注', dataIndex: 'documentRemark', width: widthTypeTwo },
      { title: '单据标签', dataIndex: 'documentLabel', width: widthTypeTwo },
      { title: '附件数', dataIndex: 'attachmentCount', width: widthTypeOne }
    ],
    scroll: {
      x: 15000
    },
    dataSource: []
  }

  const api = {
    list: getTransferInventoryList
  }

  return {
    formJson,
    cardConfig,
    tableConfig,
    api
  }
}
