import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

export const useTableHeightReactLifecycle = () => {
  const dispatch = useAppDispatch()
  const calculatedRef = useRef(false)
  const retryCountRef = useRef(0)
  const maxRetries = 20 // 增加重试次数

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

    // 更宽松的条件检查
    const hasKeyElements = height1 > 0 || height2 > 0 || height3 > 0
    const hasReasonableHeight = height > 50 // 降低最小高度要求

    console.log('计算表格高度:', {
      screenHeight,
      height1,
      height2,
      height3,
      height4,
      height5,
      height6,
      height7,
      height8,
      calculatedHeight: height,
      hasKeyElements,
      hasReasonableHeight
    })

    if (hasReasonableHeight && hasKeyElements) {
      dispatch(setTableHeight(height))
      calculatedRef.current = true
      return true
    }

    return false
  }, [dispatch])

  const tryCalculateWithRetry = useCallback(() => {
    const success = calculateTableHeight()

    if (!success && retryCountRef.current < maxRetries) {
      retryCountRef.current++
      const delay = Math.min(50 * retryCountRef.current, 2000) // 更短的延迟，最大2秒

      console.log(`重试计算表格高度，第 ${retryCountRef.current} 次，延迟 ${delay}ms`)

      // 使用 requestAnimationFrame 而不是 setTimeout
      const retry = () => {
        requestAnimationFrame(() => {
          if (!calculatedRef.current) {
            setTimeout(tryCalculateWithRetry, delay)
          }
        })
      }

      retry()
    }
  }, [calculateTableHeight])

  useEffect(() => {
    console.log('useTableHeightReactLifecycle 初始化')

    // 重置状态
    calculatedRef.current = false
    retryCountRef.current = 0

    // 策略1: 立即尝试
    tryCalculateWithRetry()

    // 策略2: 等待 React 渲染完成
    const handleReactRenderComplete = () => {
      console.log('React 渲染完成，尝试计算高度')
      if (!calculatedRef.current) {
        retryCountRef.current = 0
        tryCalculateWithRetry()
      }
    }

    // 策略3: 监听 DOM 完全加载
    const handleDOMComplete = () => {
      console.log('DOM 完全加载，尝试计算高度')
      if (!calculatedRef.current) {
        retryCountRef.current = 0
        tryCalculateWithRetry()
      }
    }

    // 策略4: 监听页面完全加载
    const handlePageLoad = () => {
      console.log('页面完全加载，尝试计算高度')
      if (!calculatedRef.current) {
        retryCountRef.current = 0
        tryCalculateWithRetry()
      }
    }

    // 策略5: 监听路由变化（React Router）
    const handleRouteChange = () => {
      console.log('路由变化，重置并重新计算高度')
      calculatedRef.current = false
      retryCountRef.current = 0
      tryCalculateWithRetry()
    }

    // 策略6: 监听窗口大小变化
    const handleResize = () => {
      if (!calculatedRef.current) {
        retryCountRef.current = 0
        tryCalculateWithRetry()
      }
    }

    // 策略7: 监听 Ant Design 组件渲染完成
    const handleAntdRender = () => {
      console.log('Ant Design 组件渲染，尝试计算高度')
      if (!calculatedRef.current) {
        retryCountRef.current = 0
        tryCalculateWithRetry()
      }
    }

    // 添加事件监听器
    document.addEventListener('DOMContentLoaded', handleDOMComplete)
    window.addEventListener('load', handlePageLoad)
    window.addEventListener('resize', handleResize)
    window.addEventListener('popstate', handleRouteChange)

    // 监听 React Router 的 pushState 和 replaceState
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

    // 监听 Ant Design 相关事件
    document.addEventListener('transitionend', handleAntdRender)
    document.addEventListener('animationend', handleAntdRender)

    // 策略8: 使用 MutationObserver 作为最后的保险
    const observer = new MutationObserver(mutations => {
      let shouldRecalculate = false

      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // 检查是否添加了我们要监听的元素
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
        retryCountRef.current = 0
        tryCalculateWithRetry()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    })

    // 策略9: 使用 requestAnimationFrame 定期检查
    const checkPeriodically = () => {
      if (!calculatedRef.current && retryCountRef.current < maxRetries) {
        tryCalculateWithRetry()
        requestAnimationFrame(checkPeriodically)
      }
    }

    // 延迟开始定期检查，给其他策略一些时间
    setTimeout(() => {
      if (!calculatedRef.current) {
        requestAnimationFrame(checkPeriodically)
      }
    }, 100)

    return () => {
      observer.disconnect()
      document.removeEventListener('DOMContentLoaded', handleDOMComplete)
      window.removeEventListener('load', handlePageLoad)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('popstate', handleRouteChange)
      document.removeEventListener('transitionend', handleAntdRender)
      document.removeEventListener('animationend', handleAntdRender)

      // 恢复原始方法
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [tryCalculateWithRetry])

  return { calculateTableHeight: tryCalculateWithRetry }
}
