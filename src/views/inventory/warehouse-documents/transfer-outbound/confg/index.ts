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
          }
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
      transferStatus: {
        label: '调拨状态',
        type: 'checkboxSelect',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          options: [
            {
              label: '未出库',
              value: '1'
            },
            {
              label: '未入库',
              value: '2'
            },
            {
              label: '部分入库',
              value: '3'
            },
            {
              label: '全部入库',
              value: '4'
            }
          ],
          mode: 'multiple',
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
      discrepancyHandlingStatus: {
        label: '差异处理状态',
        type: 'checkboxSelect',
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
        component: {
          options: [
            {
              label: '已处理',
              value: '1'
            },
            {
              label: '未处理',
              value: '2'
            }
          ],
          mode: 'multiple',
          allowClear: true
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
      { title: '单据日期', dataIndex: 'documentDate', key: 'documentDate' },
      { title: '单据编号', dataIndex: 'documentNumber', key: 'documentNumber' },
      { title: '审核状态', dataIndex: 'auditStatus', key: 'auditStatus' },
      { title: '业务类型', dataIndex: 'businessType', key: 'businessType' },
      { title: '调拨状态', dataIndex: 'transferStatus', key: 'transferStatus' },
      { title: '差异处理状态', dataIndex: 'discrepancyHandlingStatus', key: 'discrepancyHandlingStatus' },
      { title: '调出部门', dataIndex: 'outgoingDepartment', key: 'outgoingDepartment' },
      { title: '调入部门', dataIndex: 'incomingDepartment', key: 'incomingDepartment' },
      { title: '调出仓库(表头)', dataIndex: 'outgoingWarehouse', key: 'outgoingWarehouse' },
      { title: '调出仓位(表头)', dataIndex: 'outgoingPosition', key: 'outgoingPosition' },
      { title: '调入仓库(表头)', dataIndex: 'incomingWarehouse', key: 'incomingWarehouse' },
      { title: '调入仓位(表头)', dataIndex: 'incomingPosition', key: 'incomingPosition' },
      { title: '经办人', dataIndex: 'handler', key: 'handler' },
      { title: '分录行号', dataIndex: 'entryLineNumber', key: 'entryLineNumber' },
      { title: '调出仓库', dataIndex: 'outgoingWarehouseDetail', key: 'outgoingWarehouseDetail' },
      { title: '调出仓位', dataIndex: 'outgoingPositionDetail', key: 'outgoingPositionDetail' },
      { title: '调入仓库', dataIndex: 'incomingWarehouseDetail', key: 'incomingWarehouseDetail' },
      { title: '调入仓位', dataIndex: 'incomingPositionDetail', key: 'incomingPositionDetail' },
      { title: '商品图片', dataIndex: 'productImage', key: 'productImage' },
      { title: '商品编码', dataIndex: 'productCode', key: 'productCode' },
      { title: '商品名称', dataIndex: 'productName', key: 'productName' },
      { title: '条形码', dataIndex: 'barcode', key: 'barcode' },
      { title: '规格型号', dataIndex: 'specificationModel', key: 'specificationModel' },
      { title: '商品类别', dataIndex: 'productCategory', key: 'productCategory' },
      { title: '品牌', dataIndex: 'brand', key: 'brand' },
      { title: '辅助属性', dataIndex: 'auxiliaryAttribute', key: 'auxiliaryAttribute' },
      { title: 'SKU编码', dataIndex: 'skuCode', key: 'skuCode' },
      { title: '装量', dataIndex: 'packaging', key: 'packaging' },
      { title: '尺寸', dataIndex: 'size', key: 'size' },
      { title: '等级', dataIndex: 'grade', key: 'grade' },
      { title: '颜色', dataIndex: 'color', key: 'color' },
      { title: '编号', dataIndex: 'number', key: 'number' },
      { title: '重量单位', dataIndex: 'weightUnit', key: 'weightUnit' },
      { title: '净重', dataIndex: 'netWeight', key: 'netWeight' },
      { title: '总净重', dataIndex: 'totalNetWeight', key: 'totalNetWeight' },
      { title: '毛重', dataIndex: 'grossWeight', key: 'grossWeight' },
      { title: '总毛重', dataIndex: 'totalGrossWeight', key: 'totalGrossWeight' },
      { title: '体积单位', dataIndex: 'volumeUnit', key: 'volumeUnit' },
      { title: '体积', dataIndex: 'volume', key: 'volume' },
      { title: '总体积', dataIndex: 'totalVolume', key: 'totalVolume' },
      { title: '批次', dataIndex: 'batch', key: 'batch' },
      { title: '生产日期', dataIndex: 'productionDate', key: 'productionDate' },
      { title: '保质期单位', dataIndex: 'shelfLifeUnit', key: 'shelfLifeUnit' },
      { title: '保质期', dataIndex: 'shelfLife', key: 'shelfLife' },
      { title: '到期日', dataIndex: 'expirationDate', key: 'expirationDate' },
      { title: '注册证号', dataIndex: 'registrationNumber', key: 'registrationNumber' },
      { title: '生产许可证', dataIndex: 'productionLicense', key: 'productionLicense' },
      { title: '产地', dataIndex: 'origin', key: 'origin' },
      {
        title: '调出仓可用库存',
        dataIndex: 'outgoingWarehouseAvailableStock',
        key: 'outgoingWarehouseAvailableStock'
      },
      {
        title: '调出仓即时库存',
        dataIndex: 'outgoingWarehouseInstantStock',
        key: 'outgoingWarehouseInstantStock'
      },
      {
        title: '调出仓预计可用库存',
        dataIndex: 'outgoingWarehouseEstimatedAvailableStock',
        key: 'outgoingWarehouseEstimatedAvailableStock',
        width: 180
      },
      {
        title: '调入仓可用库存',
        dataIndex: 'incomingWarehouseAvailableStock',
        key: 'incomingWarehouseAvailableStock'
      },
      {
        title: '调入仓即时库存',
        dataIndex: 'incomingWarehouseInstantStock',
        key: 'incomingWarehouseInstantStock'
      },
      {
        title: '调入仓预计可用库存',
        dataIndex: 'incomingWarehouseEstimatedAvailableStock',
        key: 'incomingWarehouseEstimatedAvailableStock',
        width: 180
      },
      { title: '单位', dataIndex: 'unit', key: 'unit' },
      { title: '数量', dataIndex: 'quantity', key: 'quantity' },
      { title: '换算率', dataIndex: 'conversionRate', key: 'conversionRate' },
      { title: '辅助单位', dataIndex: 'auxiliaryUnit', key: 'auxiliaryUnit' },
      { title: '辅助数量', dataIndex: 'auxiliaryQuantity', key: 'auxiliaryQuantity' },
      { title: '整件散包', dataIndex: 'wholePackage', key: 'wholePackage' },
      { title: '基本单位', dataIndex: 'basicUnit', key: 'basicUnit' },
      { title: '基本数量', dataIndex: 'basicQuantity', key: 'basicQuantity' },
      { title: '调出单价', dataIndex: 'outgoingUnitPrice', key: 'outgoingUnitPrice' },
      { title: '调出金额', dataIndex: 'outgoingAmount', key: 'outgoingAmount' },
      { title: '折扣（折）', dataIndex: 'discount', key: 'discount' },
      { title: '零售价', dataIndex: 'retailPrice', key: 'retailPrice' },
      { title: '零售金额', dataIndex: 'retailAmount', key: 'retailAmount' },
      { title: '基本单位成本', dataIndex: 'basicUnitCost', key: 'basicUnitCost' },
      { title: '单位成本', dataIndex: 'unitCost', key: 'unitCost' },
      { title: '成本', dataIndex: 'cost', key: 'cost' },
      { title: '入库数量', dataIndex: 'storageQuantity', key: 'storageQuantity' },
      { title: '费用分摊比例（%）', dataIndex: 'costSharingRatio', key: 'costSharingRatio', width: 180 },
      { title: '调出费用分摊', dataIndex: 'outgoingCostSharing', key: 'outgoingCostSharing' },
      { title: '参考单位成本', dataIndex: 'referenceUnitCost', key: 'referenceUnitCost' },
      { title: '含费用调出单价', dataIndex: 'costIncludedOutgoingUnitPrice', key: 'costIncludedOutgoingUnitPrice' },
      { title: '含费用调出金额', dataIndex: 'costIncludedOutgoingAmount', key: 'costIncludedOutgoingAmount' },
      { title: '商品描述', dataIndex: 'productDescription', key: 'productDescription' },
      { title: '商品行备注', dataIndex: 'productLineRemark', key: 'productLineRemark' },
      { title: '调拨费用', dataIndex: 'transferCost', key: 'transferCost' },
      { title: '调拨费用明细', dataIndex: 'transferCostDetails', key: 'transferCostDetails' },
      { title: '收货地址（联系人）', dataIndex: 'recipientContact', key: 'recipientContact', width: 180 },
      { title: '收货地址（手机号）', dataIndex: 'recipientPhone', key: 'recipientPhone', width: 180 },
      { title: '收货地址（国家）', dataIndex: 'recipientCountry', key: 'recipientCountry', width: 150 },
      { title: '收货地址（省）', dataIndex: 'recipientProvince', key: 'recipientProvince' },
      { title: '收货地址（市）', dataIndex: 'recipientCity', key: 'recipientCity' },
      { title: '收货地址（区）', dataIndex: 'recipientDistrict', key: 'recipientDistrict' },
      { title: '收货地址', dataIndex: 'recipientAddress', key: 'recipientAddress' },
      { title: '凭证字号', dataIndex: 'voucherNumber', key: 'voucherNumber' },
      { title: '源单单号', dataIndex: 'sourceDocumentNumber', key: 'sourceDocumentNumber' },
      { title: '源单行号', dataIndex: 'sourceDocumentLineNumber', key: 'sourceDocumentLineNumber' },
      { title: '制单人', dataIndex: 'creator', key: 'creator' },
      { title: '制单时间', dataIndex: 'creationTime', key: 'creationTime' },
      { title: '审核人', dataIndex: 'auditor', key: 'auditor' },
      { title: '审核时间', dataIndex: 'auditTime', key: 'auditTime' },
      { title: '最后修改人', dataIndex: 'lastModifier', key: 'lastModifier' },
      { title: '最后修改时间', dataIndex: 'lastModificationTime', key: 'lastModificationTime' },
      { title: '打印次数', dataIndex: 'printCount', key: 'printCount' },
      { title: '交货方式', dataIndex: 'deliveryMethod', key: 'deliveryMethod' },
      { title: '物流公司', dataIndex: 'logisticsCompany', key: 'logisticsCompany' },
      { title: '物流单号', dataIndex: 'logisticsNumber', key: 'logisticsNumber' },
      { title: '发货时间', dataIndex: 'shippingTime', key: 'shippingTime' },
      { title: '物流备注', dataIndex: 'logisticsRemark', key: 'logisticsRemark' },
      { title: '物流分录行号', dataIndex: 'logisticsEntryLineNumber', key: 'logisticsEntryLineNumber' },
      { title: '单据备注', dataIndex: 'documentRemark', key: 'documentRemark' },
      { title: '单据标签', dataIndex: 'documentLabel', key: 'documentLabel' },
      { title: '单据来源', dataIndex: 'documentSource', key: 'documentSource' },
      { title: '附件数', dataIndex: 'attachmentCount', key: 'attachmentCount' }
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
