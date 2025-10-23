import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

export const useTableHeightIntersectionObserver = () => {
  const dispatch = useAppDispatch()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const calculatedRef = useRef(false)
  const targetElementsRef = useRef<Element[]>([])

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

  const findAndObserveElements = useCallback(() => {
    const selectors = [
      '.ant-layout-header',
      '._layout_tags_mbhag_1',
      '.tableForm',
      '.ant-pagination',
      '.ant-table-thead'
    ]

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(element => {
        if (!targetElementsRef.current.includes(element)) {
          targetElementsRef.current.push(element)
          observerRef.current?.observe(element)
        }
      })
    })
  }, [])

  useEffect(() => {
    // 立即尝试一次
    calculateTableHeight()

    if (calculatedRef.current) {
      return
    }

    // 创建 IntersectionObserver
    observerRef.current = new IntersectionObserver(
      entries => {
        let shouldRecalculate = false

        entries.forEach(entry => {
          // 当元素进入视口或尺寸发生变化时
          if (entry.isIntersecting || entry.boundingClientRect.height > 0) {
            shouldRecalculate = true
          }
        })

        if (shouldRecalculate && !calculatedRef.current) {
          calculateTableHeight()
        }
      },
      {
        root: null, // 使用视口作为根
        rootMargin: '0px',
        threshold: 0 // 只要有任何部分可见就触发
      }
    )

    // 定期查找新元素（使用 requestAnimationFrame 而不是 setTimeout）
    const checkForNewElements = () => {
      if (!calculatedRef.current) {
        findAndObserveElements()
        requestAnimationFrame(checkForNewElements)
      }
    }

    requestAnimationFrame(checkForNewElements)

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
  }, [calculateTableHeight, findAndObserveElements])

  return { calculateTableHeight }
}
