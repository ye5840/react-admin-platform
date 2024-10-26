import type { FC, Key } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Input, Tree } from 'antd'
import type { TreeDataNode } from 'antd'
import styles from './index.module.less'

interface TreeSelectInputProps {
  inputConfig: objAny
  treeConfig: objAny
}

type TreeSelectEvent = (selectedKeys: Key[], info: { node: any; selected: boolean }) => void

const TreeSelectInput = (props: TreeSelectInputProps) => {
  const { inputConfig, treeConfig } = props
  const treeRef = useRef<HTMLDivElement>(null)
  const [treeSelectInputInfo, setTreeSelectInputInfo] = useState({
    selectContentShow: false,
    inputValue: ''
  })

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

  const handleSelect: TreeSelectEvent = (selectedKeys, { node, selected }) => {
    const inputValue = findPathByKey(treeConfig.treeData, node.key)
    setTreeSelectInputInfo({
      selectContentShow: false,
      inputValue
    })
  }

  // 添加 useEffect 监听点击事件
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (treeRef.current && !treeRef.current.contains(event.target as Node)) {
        setTreeSelectInputInfo(prev => ({ ...prev, selectContentShow: false }))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles['treeSelectInput-wrapper']} ref={treeRef}>
      <Input onFocus={handleFocus} {...inputConfig} value={treeSelectInputInfo.inputValue}></Input>
      {treeSelectInputInfo.selectContentShow && (
        <Tree {...treeConfig} className={styles['tree']} onSelect={handleSelect}></Tree>
      )}
    </div>
  )
}

export default TreeSelectInput
