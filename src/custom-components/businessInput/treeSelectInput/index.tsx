import type { FC, Key } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Input, Tree } from 'antd'
import type { TreeDataNode } from 'antd'
import styles from './index.module.less'

interface TreeSelectInputProps {
  inputConfig: objAny
  treeConfig: objAny
  value: string | number
  onChange: Function
}

type TreeSelectEvent = (selectedKeys: Key[], info: { node: any; selected: boolean }) => void

const TreeSelectInput = (props: TreeSelectInputProps) => {
  const { inputConfig, treeConfig, value, onChange } = props
  const treeSelectInputRef = useRef<HTMLDivElement>(null)
  const [treeSelectInputInfo, setTreeSelectInputInfo] = useState({
    selectContentShow: false,
    inputValue: value || ''
  })

  // 监听外部 value 变化
  useEffect(() => {
    setTreeSelectInputInfo(prev => ({
      ...prev,
      inputValue: value || ''
    }))
  }, [value])

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
    const inputValue = findPathByKey(treeConfig.treeData, node.key)
    // 更新本地状态
    setTreeSelectInputInfo({
      selectContentShow: false, // 选择后关闭弹窗
      inputValue: inputValue || ''
    })

    // 通知 Form.Item 值已更新
    onChange?.(inputValue)
  }

  // 处理输入值变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const newValue = e.target.value
    // // 更新本地状态
    // setTreeSelectInputInfo({
    //   ...treeSelectInputInfo,
    //   inputValue: newValue
    // })
    // // 通知 Form.Item 值已更新
    // onChange?.(newValue)
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

  return (
    <div className={styles['treeSelectInput-wrapper']} ref={treeSelectInputRef}>
      <Input
        onFocus={handleFocus}
        {...inputConfig}
        value={treeSelectInputInfo.inputValue}
        // onChange={handleInputChange}
      ></Input>
      {treeSelectInputInfo.selectContentShow && (
        <Tree {...treeConfig} className={styles['tree']} onSelect={handleTreeSelect}></Tree>
      )}
    </div>
  )
}

export default TreeSelectInput
