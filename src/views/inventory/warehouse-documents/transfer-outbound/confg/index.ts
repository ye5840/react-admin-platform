export const getJson = () => {
  const formJson = {
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
      }
    },
    documentDate: {
      label: '单据日期',
      type: 'dateRangeInput',
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
  return {
    formJson
  }
}
