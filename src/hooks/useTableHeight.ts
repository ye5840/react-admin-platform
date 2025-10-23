import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

export const useTableHeight = () => {
  const dispatch = useAppDispatch()
  const observerRef = useRef<ResizeObserver | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const retryCountRef = useRef(0)
  const maxRetries = 10 // 最大重试次数

  const calculateTableHeight = useCallback(() => {
    const screenHeight = document.documentElement.clientHeight
    const height1 = document.getElementsByClassName('ant-layout-header')?.[0]?.clientHeight || 0
    const height2 = document.getElementsByClassName('_layout_tags_mbhag_1')?.[0]?.clientHeight || 0
    const height3 = document.getElementsByClassName('tableForm')?.[0]?.clientHeight || 0
    const height4 = 24 // 内容区域上下padding
    const height5 = 48 // 表格内容区域上下padding
    const height6 = document.getElementsByClassName('ant-pagination')?.[0]?.clientHeight || 0
    const height7 = document.getElementsByClassName('ant-table-thead')?.[0]?.clientHeight || 0
    const height8 = 32 // 分页器上下margin

    const height = screenHeight - height1 - height2 - height3 - height4 - height5 - height6 - height7 - height8

    // 检查是否所有关键元素都已渲染
    const hasAllElements = height1 > 0 || height2 > 0 || height3 > 0

    // 如果高度合理且有关键元素存在，则更新
    if (height > 100 && hasAllElements) {
      dispatch(setTableHeight(height))
      retryCountRef.current = 0 // 重置重试计数
      return true
    }

    return false
  }, [dispatch])

  const tryCalculateWithRetry = useCallback(() => {
    // 使用 requestAnimationFrame 确保在下一帧执行
    requestAnimationFrame(() => {
      const success = calculateTableHeight()

      // 如果计算失败且还有重试次数，则继续重试
      if (!success && retryCountRef.current < maxRetries) {
        retryCountRef.current++
        const delay = Math.min(100 * retryCountRef.current, 1000) // 递增延迟，最大1秒
        timeoutRef.current = setTimeout(tryCalculateWithRetry, delay)
      }
    })
  }, [calculateTableHeight])

  useEffect(() => {
    // 策略1: 立即尝试计算
    tryCalculateWithRetry()

    // 策略2: 监听 DOM 内容加载完成
    const handleDOMContentLoaded = () => {
      if (document.readyState === 'complete') {
        tryCalculateWithRetry()
      }
    }

    // 策略3: 监听页面完全加载
    const handleLoad = () => {
      tryCalculateWithRetry()
    }

    // 策略4: 使用 ResizeObserver 监听布局变化
    observerRef.current = new ResizeObserver(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(tryCalculateWithRetry, 100)
    })

    // 监听 body 元素的变化
    observerRef.current.observe(document.body)

    // 策略5: 监听窗口大小变化
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(tryCalculateWithRetry, 100)
    }

    // 策略6: 监听路由变化（如果使用 React Router）
    const handleRouteChange = () => {
      retryCountRef.current = 0 // 重置重试计数
      tryCalculateWithRetry()
    }

    // 添加事件监听器
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
    window.addEventListener('load', handleLoad)
    window.addEventListener('resize', handleResize)

    // 监听路由变化（通过监听 popstate 事件）
    window.addEventListener('popstate', handleRouteChange)

    // 监听 pushState 和 replaceState（需要重写这些方法）
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

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('popstate', handleRouteChange)

      // 恢复原始方法
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [tryCalculateWithRetry])

  return { calculateTableHeight: tryCalculateWithRetry }
}
