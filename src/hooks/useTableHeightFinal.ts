import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

export const useTableHeightFinal = () => {
  const dispatch = useAppDispatch()
  const calculatedRef = useRef(false)
  const timeoutRefs = useRef<Set<NodeJS.Timeout>>(new Set())

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

    console.log('计算表格高度:', {
      screenHeight,
      height1,
      height2,
      height3,
      calculatedHeight: height,
      timestamp: new Date().toISOString()
    })

    // 设置高度，即使没有关键元素也设置一个合理的高度
    if (height > 0) {
      dispatch(setTableHeight(height))
      calculatedRef.current = true
      return true
    }

    return false
  }, [dispatch])

  const scheduleCalculation = useCallback(
    (delay: number) => {
      const timeoutId = setTimeout(() => {
        if (!calculatedRef.current) {
          calculateTableHeight()
        }
        timeoutRefs.current.delete(timeoutId)
      }, delay)

      timeoutRefs.current.add(timeoutId)
      return timeoutId
    },
    [calculateTableHeight]
  )

  useEffect(() => {
    console.log('useTableHeightFinal 初始化')

    // 重置状态
    calculatedRef.current = false

    // 立即尝试
    calculateTableHeight()

    // 如果立即尝试失败，使用多种时间点尝试
    if (!calculatedRef.current) {
      // 使用不同的延迟时间点
      const delays = [0, 1, 5, 10, 20, 50, 100, 200, 300, 500, 800, 1000, 1500, 2000]

      delays.forEach(delay => {
        scheduleCalculation(delay)
      })
    }

    // 监听各种事件
    const handleEvent = () => {
      if (!calculatedRef.current) {
        calculateTableHeight()
      }
    }

    // 监听窗口大小变化
    window.addEventListener('resize', handleEvent)

    // 监听路由变化
    const handleRouteChange = () => {
      calculatedRef.current = false
      calculateTableHeight()
    }

    window.addEventListener('popstate', handleRouteChange)

    // 监听 pushState 和 replaceState
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args) {
      originalPushState.apply(history, args)
      handleRouteChange()
    }

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args)
      handleRouteChange()
    }

    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver(mutations => {
      let shouldRecalculate = false

      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              if (
                element.classList.contains('ant-layout-header') ||
                element.classList.contains('_layout_tags_mbhag_1') ||
                element.classList.contains('tableForm') ||
                element.querySelector('.ant-layout-header') ||
                element.querySelector('._layout_tags_mbhag_1') ||
                element.querySelector('.tableForm')
              ) {
                shouldRecalculate = true
              }
            }
          })
        }
      })

      if (shouldRecalculate && !calculatedRef.current) {
        console.log('检测到关键元素添加，重新计算高度')
        calculateTableHeight()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    })

    return () => {
      // 清理所有定时器
      timeoutRefs.current.forEach(timeoutId => {
        clearTimeout(timeoutId)
      })
      timeoutRefs.current.clear()

      // 清理观察器
      observer.disconnect()

      // 清理事件监听器
      window.removeEventListener('resize', handleEvent)
      window.removeEventListener('popstate', handleRouteChange)

      // 恢复原始方法
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [calculateTableHeight, scheduleCalculation])

  return { calculateTableHeight }
}
