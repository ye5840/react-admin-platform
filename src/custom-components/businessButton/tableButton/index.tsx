import { useEffect, useState } from 'react'
import { ContentWrap } from '@/components/ContentWrap'
import BasicButton from '@/custom-components/basicButton'
import './index.less'

interface tableButtonProp {
  form: objAny
  setFormData?: Function
  initFormData?: objAny
}

const TableButton = (props: tableButtonProp) => {
  const { setFormData, initFormData, form } = props
  const [tableButtonConfig, setTableButtonConfig] = useState({
    expand: false
  })

  const operateBtnConfig = {
    add: {
      name: '新增'
    },
    edit: {
      name: '编辑'
    },
    del: {
      name: '删除'
    },
    refresh: {
      name: '刷新'
    },
    invalid: {
      name: '撤回'
    },
    copy: {
      name: '复制'
    },
    import: {
      name: '导入'
    },
    export: {
      name: '导出'
    },
    appovre: {
      name: '审批'
    },
    next: {
      name: '流转'
    },
    withdrawal: {
      name: '撤回'
    },
    print: {
      name: '打印'
    },
    antiAudit: {
      name: '反审'
    },
    nullify: {
      name: '作废'
    }
  }

  const searchBtnConfig = {
    reset: {
      name: '重置',
      onClick: async () => {
        await setFormData?.(initFormData)
        form.resetFields()
      }
    },
    seniorSearch: {
      name: '高级搜索'
    }
  }

  const handleExpandFold = () => {
    setTableButtonConfig({
      ...tableButtonConfig,
      expand: !tableButtonConfig.expand
    })
  }

  useEffect(() => {}, [])

  return (
    <ContentWrap>
      <div className={'contentWrap'}>
        <BasicButton btnConfig={operateBtnConfig}></BasicButton>
        <BasicButton btnConfig={searchBtnConfig}>
          <span>
            {!tableButtonConfig.expand && (
              <span className={'expand'} onClick={handleExpandFold}>
                展开
              </span>
            )}
            {tableButtonConfig.expand && (
              <span className={'fold'} onClick={handleExpandFold}>
                收起
              </span>
            )}
          </span>
        </BasicButton>
      </div>
    </ContentWrap>
  )
}

export default TableButton
