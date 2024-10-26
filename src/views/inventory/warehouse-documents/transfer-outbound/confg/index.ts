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
      label: '调拨状态'
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
      label: '调出部门'
    },
    incomingDepartment: {
      label: '调入部门'
    },
    discrepancyHandlingStatus: {
      label: '差异处理状态'
    },
    documentSource: {
      label: '单据来源'
    },
    documentLabel: {
      label: '单据标签'
    }
  }
  return {
    formJson
  }
}
