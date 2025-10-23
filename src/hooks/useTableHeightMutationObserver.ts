import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

export const useTableHeightMutationObserver = () => {
  const dispatch = useAppDispatch()
  const observerRef = useRef<MutationObserver | null>(null)
  const calculatedRef = useRef(false)

  const calculateTableHeight = useCallback(() => {
    const screenHeight = document.documentElement.clientHeight
    const height1 = document.getElementsByClassName('ant-layout-header')?.[0]?.clientHeight || 0
    const height2 = document.getElementsByClassName('_layout_tags_mbhag_1')?.[0]?.clientHeight || 0
    const height3 = document.getElementsByClassName('tableForm')?.[0]?.clientHeight || 0
    const height4 = 24
    const height5 = 48
    const height6 = document.getElementsByClassName('ant-pagination')?.[0]?.clientHeight || 0
    const height7 = document.getElementsByClassName('ant-table-thead')?.[0]?.clientHeight || 0
    const height8 = 32

    const height = screenHeight - height1 - height2 - height3 - height4 - height5 - height6 - height7 - height8

    // 检查关键元素是否已经渲染
    const hasKeyElements = height1 > 0 || height2 > 0 || height3 > 0

    if (height > 100 && hasKeyElements) {
      dispatch(setTableHeight(height))
      calculatedRef.current = true
      return true
    }

    return false
  }, [dispatch])

  useEffect(() => {
    // 立即尝试一次
    calculateTableHeight()

    // 如果已经计算成功，就不需要监听器了
    if (calculatedRef.current) {
      return
    }

    // 创建 MutationObserver 监听 DOM 变化
    observerRef.current = new MutationObserver(mutations => {
      let shouldRecalculate = false

      mutations.forEach(mutation => {
        // 监听子节点添加
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldRecalculate = true
        }
        // 监听属性变化（如 style, class 等）
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element
          if (
            target.classList.contains('ant-layout-header') ||
            target.classList.contains('_layout_tags_mbhag_1') ||
            target.classList.contains('tableForm')
          ) {
            shouldRecalculate = true
          }
        }
      })

      if (shouldRecalculate && !calculatedRef.current) {
        calculateTableHeight()
      }
    })

    // 开始观察整个文档的变化
    observerRef.current.observe(document.body, {
      childList: true, // 监听子节点的添加和删除
      subtree: true, // 监听所有后代节点
      attributes: true, // 监听属性变化
      attributeFilter: ['class', 'style'] // 只监听 class 和 style 属性
    })

    // 监听窗口大小变化
    const handleResize = () => {
      calculateTableHeight()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [calculateTableHeight])

  return { calculateTableHeight }
}
