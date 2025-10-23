import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

export const useTableHeightEventDriven = () => {
  const dispatch = useAppDispatch()
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

    // 监听所有可能触发布局变化的事件
    const events = ['DOMContentLoaded', 'load', 'resize', 'orientationchange', 'transitionend', 'animationend']

    const handleEvent = () => {
      if (!calculatedRef.current) {
        calculateTableHeight()
      }
    }

    // 添加事件监听器
    events.forEach(event => {
      if (event === 'resize' || event === 'orientationchange') {
        window.addEventListener(event, handleEvent)
      } else {
        document.addEventListener(event, handleEvent)
      }
    })

    // 监听 React Router 的路由变化
    const handleRouteChange = () => {
      calculatedRef.current = false // 重置状态
      calculateTableHeight()
    }

    // 监听浏览器前进后退
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

    return () => {
      // 清理事件监听器
      events.forEach(event => {
        if (event === 'resize' || event === 'orientationchange') {
          window.removeEventListener(event, handleEvent)
        } else {
          document.removeEventListener(event, handleEvent)
        }
      })

      window.removeEventListener('popstate', handleRouteChange)

      // 恢复原始方法
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [calculateTableHeight])

  return { calculateTableHeight }
}
