export const getJson = () => {
  const formJson = {
    formConfig: {
      size: 'small'
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
          size: 'samll'
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
          optionsFiled: {
            label: 'name',
            value: 'code'
          }
        }
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
          allowClear: true
        }
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
          allowClear: true
        }
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
          optionsFiled: {
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
          dictUrl: ''
        }
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
          optionsFiled: {
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
          dictUrl: ''
        }
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
          mode: 'multiple',
          allowClear: true
        }
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
          optionsFiled: {
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
          dictUrl: ''
        }
      }
    }
  }

  const cardConfig = {}

  const tableConfig = {
    columns: [
      { title: '单据日期', dataIndex: 'documentDate', width: 100 },
      { title: '单据编号', dataIndex: 'documentNumber', width: 100 },
      { title: '审核状态', dataIndex: 'auditStatus', width: 100 },
      { title: '业务类型', dataIndex: 'businessType', width: 100 },
      { title: '调出部门', dataIndex: 'outgoingDepartment', width: 100 },
      { title: '调入部门', dataIndex: 'incomingDepartment', width: 100 },
      { title: '调入仓库', dataIndex: 'incomingWarehouse', width: 180 },
      { title: '调入仓位', dataIndex: 'incomingLocation', width: 180 },
      { title: '经办人', dataIndex: 'handler', width: 100 },
      { title: '分录行号', dataIndex: 'entryLineNumber', width: 100 },
      { title: '调出仓库', dataIndex: 'outgoingWarehouse', width: 180 },
      { title: '调出仓位', dataIndex: 'outgoingLocation', width: 180 },
      { title: '商品图片', dataIndex: 'productImage', width: 180 },
      { title: '商品编码', dataIndex: 'productCode', width: 100 },
      { title: '商品名称', dataIndex: 'productName', width: 180 },
      { title: '条形码', dataIndex: 'barcode', width: 100 },
      { title: '规格型号', dataIndex: 'specificationModel', width: 180 },
      { title: '商品类别', dataIndex: 'productCategory', width: 180 },
      { title: '品牌', dataIndex: 'brand', width: 100 },
      { title: '辅助属性', dataIndex: 'auxiliaryAttributes', width: 180 },
      { title: 'SKU编码', dataIndex: 'skuCode', width: 100 },
      { title: '装量', dataIndex: 'packaging', width: 100 },
      { title: '尺寸', dataIndex: 'size', width: 100 },
      { title: '等级', dataIndex: 'grade', width: 100 },
      { title: '颜色', dataIndex: 'color', width: 100 },
      { title: '编号', dataIndex: 'number', width: 100 },
      { title: '重量单位', dataIndex: 'weightUnit', width: 100 },
      { title: '净重', dataIndex: 'netWeight', width: 100 },
      { title: '总净重', dataIndex: 'totalNetWeight', width: 100 },
      { title: '毛重', dataIndex: 'grossWeight', width: 100 },
      { title: '总毛重', dataIndex: 'totalGrossWeight', width: 100 },
      { title: '体积单位', dataIndex: 'volumeUnit', width: 100 },
      { title: '体积', dataIndex: 'volume', width: 100 },
      { title: '总体积', dataIndex: 'totalVolume', width: 100 },
      { title: '批次', dataIndex: 'batch', width: 100 },
      { title: '生产日期', dataIndex: 'productionDate', width: 100 },
      { title: '保质期单位', dataIndex: 'shelfLifeUnit', width: 100 },
      { title: '保质期', dataIndex: 'shelfLife', width: 100 },
      { title: '到期日', dataIndex: 'expirationDate', width: 100 },
      { title: '注册证号', dataIndex: 'registrationNumber', width: 180 },
      { title: '生产许可证', dataIndex: 'productionLicense', width: 180 },
      { title: '产地', dataIndex: 'origin', width: 180 },
      { title: '可用库存', dataIndex: 'availableStock', width: 100 },
      { title: '即时库存', dataIndex: 'instantStock', width: 100 },
      { title: '预计可用库存', dataIndex: 'estimatedAvailableStock', width: 100 },
      { title: '单位', dataIndex: 'unit', width: 100 },
      { title: '数量', dataIndex: 'quantity', width: 100 },
      { title: '换算率', dataIndex: 'conversionRate', width: 100 },
      { title: '辅助单位', dataIndex: 'auxiliaryUnit', width: 100 },
      { title: '辅助数量', dataIndex: 'auxiliaryQuantity', width: 100 },
      { title: '基本单位', dataIndex: 'basicUnit', width: 100 },
      { title: '基本数量', dataIndex: 'basicQuantity', width: 100 },
      { title: '调入单价', dataIndex: 'incomingUnitPrice', width: 100 },
      { title: '调入金额', dataIndex: 'incomingAmount', width: 100 },
      { title: '折扣（折）', dataIndex: 'discount', width: 100 },
      { title: '零售价', dataIndex: 'retailPrice', width: 100 },
      { title: '零售金额', dataIndex: 'retailAmount', width: 100 },
      { title: '基本单位成本', dataIndex: 'basicUnitCost', width: 100 },
      { title: '单位成本', dataIndex: 'unitCost', width: 100 },
      { title: '成本', dataIndex: 'cost', width: 100 },
      { title: '费用分摊比例（%）', dataIndex: 'costSharingRatio', width: 180 },
      { title: '调入费用分摊', dataIndex: 'incomingCostSharing', width: 100 },
      { title: '参考单位成本', dataIndex: 'referenceUnitCost', width: 100 },
      { title: '关联调拨费用', dataIndex: 'relatedTransferCost', width: 100 },
      { title: '商品描述', dataIndex: 'productDescription', width: 180 },
      { title: '商品行备注', dataIndex: 'productLineRemark', width: 180 },
      { title: '调拨费用', dataIndex: 'transferCost', width: 100 },
      { title: '调拨费用明细', dataIndex: 'transferCostDetails', width: 180 },
      { title: '收货地址（联系人）', dataIndex: 'recipientContact', width: 180 },
      { title: '收货地址（手机号）', dataIndex: 'recipientPhone', width: 180 },
      { title: '收货地址（国家）', dataIndex: 'recipientCountry', width: 180 },
      { title: '收货地址（省）', dataIndex: 'recipientProvince', width: 180 },
      { title: '收货地址（市）', dataIndex: 'recipientCity', width: 180 },
      { title: '收货地址（区）', dataIndex: 'recipientDistrict', width: 180 },
      { title: '收货地址', dataIndex: 'recipientAddress', width: 180 },
      { title: '凭证字号', dataIndex: 'voucherNumber', width: 180 },
      { title: '单据来源', dataIndex: 'documentSource', width: 100 },
      { title: '源单类型', dataIndex: 'sourceDocumentType', width: 180 },
      { title: '源单单号', dataIndex: 'sourceDocumentNumber', width: 180 },
      { title: '源单行号', dataIndex: 'sourceDocumentLineNumber', width: 100 },
      { title: '制单人', dataIndex: 'creator', width: 100 },
      { title: '制单时间', dataIndex: 'creationTime', width: 100 },
      { title: '审核人', dataIndex: 'auditor', width: 100 },
      { title: '审核时间', dataIndex: 'auditTime', width: 100 },
      { title: '最后修改人', dataIndex: 'lastModifier', width: 100 },
      { title: '最后修改时间', dataIndex: 'lastModificationTime', width: 100 },
      { title: '打印次数', dataIndex: 'printCount', width: 100 },
      { title: '交货方式', dataIndex: 'deliveryMethod', width: 180 },
      { title: '物流公司', dataIndex: 'logisticsCompany', width: 180 },
      { title: '物流单号', dataIndex: 'logisticsNumber', width: 180 },
      { title: '发货时间', dataIndex: 'shippingTime', width: 100 },
      { title: '物流备注', dataIndex: 'logisticsRemark', width: 180 },
      { title: '物流分录行号', dataIndex: 'logisticsEntryLineNumber', width: 100 },
      { title: '单据备注', dataIndex: 'documentRemark', width: 180 },
      { title: '单据标签', dataIndex: 'documentLabel', width: 180 },
      { title: '附件数', dataIndex: 'attachmentCount', width: 100 }
    ],
    scroll: {
      x: 15000
    }
  }

  return {
    formJson,
    cardConfig,
    tableConfig
  }
}
