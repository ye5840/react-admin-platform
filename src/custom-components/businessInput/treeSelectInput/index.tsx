import type { Key } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Input, Tree } from 'antd'
import type { TreeDataNode } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import './index.less'

interface TreeSelectInputProps {
  inputConfig: objAny
  treeConfig: objAny
  value: string | number
  setValue: Function
  labelName: string | undefined
}

type TreeSelectEvent = (selectedKeys: Key[], info: { node: any; selected: boolean }) => void

const getInitialState = () => ({
  selectContentShow: false, // 是否展示下拉选择
  inputLabel: undefined, // 选择的label的值
  inputValue: undefined // 选择的value的值
})

interface stateType {
  selectContentShow: boolean
  inputLabel: string | undefined
  inputValue: string | number | undefined
}

const TreeSelectInput = (props: TreeSelectInputProps) => {
  const { inputConfig, treeConfig, value, setValue, labelName } = props
  const treeSelectInputRef = useRef<HTMLDivElement>(null)
  const [treeSelectInputInfo, setTreeSelectInputInfo] = useState<stateType>(getInitialState())

  const handleFocus = () => {
    setTreeSelectInputInfo({
      ...treeSelectInputInfo,
      selectContentShow: true
    })
  }

  const findPathByKey = (tree: TreeDataNode[], targetKey: string, path: any[] = []): string => {
    for (const node of tree) {
      const currentPath = [...path, node.title] // 更新当前路径
      if (node.key === targetKey) {
        return currentPath.join('/') // 找到目标，返回路径
      }
      if (node.children) {
        const result = findPathByKey(node.children, targetKey, currentPath)
        if (result) {
          return result // 如果在子节点中找到，返回结果
        }
      }
    }
    return '' // 如果没有找到，返回 null
  }

  // 处理选择树节点
  const handleTreeSelect: TreeSelectEvent = (selectedValue, { node, selected }) => {
    const inputLabel = findPathByKey(treeConfig.treeData, node.key)
    // 更新本地状态
    setTreeSelectInputInfo({
      selectContentShow: false, // 选择后关闭弹窗
      inputValue: node.key,
      inputLabel: inputLabel
    })

    setValue?.(node.key)
  }

  // 添加 useEffect 监听点击事件
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (treeSelectInputRef.current && !treeSelectInputRef.current.contains(event.target as Node)) {
        setTreeSelectInputInfo(prev => ({ ...prev, selectContentShow: false }))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const inputLabel = findPathByKey(treeConfig.treeData, value as string)
    setTreeSelectInputInfo(prev => ({
      ...prev,
      inputValue: value ?? undefined,
      inputLabel: inputLabel ?? undefined
    }))
  }, [])

  const handleIconClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()
    setTreeSelectInputInfo(perv => getInitialState())
    setValue?.(value ?? undefined)
  }

  return (
    <div className={'treeSelectInput-wrapper'} ref={treeSelectInputRef}>
      <Input
        placeholder={`请选择${labelName}`}
        {...inputConfig}
        className='tree-select-input'
        value={treeSelectInputInfo.inputLabel}
        onFocus={handleFocus}
        suffix={<CloseCircleOutlined onClick={handleIconClick} />}
      ></Input>
      <Input value={treeSelectInputInfo.inputValue} style={{ display: 'none' }} />
      {treeSelectInputInfo.selectContentShow && (
        <Tree {...treeConfig} className={'tree'} onSelect={handleTreeSelect}></Tree>
      )}
    </div>
  )
}

export default TreeSelectInput
