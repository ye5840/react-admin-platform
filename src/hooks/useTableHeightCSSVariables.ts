import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

export const useTableHeightCSSVariables = () => {
  const dispatch = useAppDispatch()
  const observerRef = useRef<ResizeObserver | null>(null)
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

    if (calculatedRef.current) {
      return
    }

    // 创建 ResizeObserver 监听特定元素
    observerRef.current = new ResizeObserver(entries => {
      let shouldRecalculate = false

      entries.forEach(entry => {
        const target = entry.target as Element
        // 检查是否是我们要监听的元素
        if (
          target.classList.contains('ant-layout-header') ||
          target.classList.contains('_layout_tags_mbhag_1') ||
          target.classList.contains('tableForm') ||
          target.classList.contains('ant-pagination') ||
          target.classList.contains('ant-table-thead')
        ) {
          shouldRecalculate = true
        }
      })

      if (shouldRecalculate && !calculatedRef.current) {
        calculateTableHeight()
      }
    })

    // 监听窗口大小变化
    const handleResize = () => {
      calculateTableHeight()
    }

    // 使用 requestAnimationFrame 定期检查元素是否存在
    const checkElements = () => {
      if (!calculatedRef.current) {
        const selectors = [
          '.ant-layout-header',
          '._layout_tags_mbhag_1',
          '.tableForm',
          '.ant-pagination',
          '.ant-table-thead'
        ]

        selectors.forEach(selector => {
          const element = document.querySelector(selector)
          if (element && observerRef.current) {
            observerRef.current.observe(element)
          }
        })

        requestAnimationFrame(checkElements)
      }
    }

    requestAnimationFrame(checkElements)
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
