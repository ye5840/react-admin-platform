import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { useEffect, useRef, useCallback } from 'react'
import { setTableHeight } from './stores/modules/app'
import { useAppDispatch } from '@/stores'

function App() {
  const dispatch = useAppDispatch()
  const calculatedRef = useRef(false)
  const timeoutRefs = useRef<Set<NodeJS.Timeout>>(new Set())

  const calculateTableHeight = useCallback(() => {
    const screenHeight = document.documentElement.clientHeight // 屏幕浏览器物理高度
    const height1 = document.getElementsByClassName('ant-layout-header')?.[0]?.clientHeight || 0 // 面包屑高度
    const height2 = document.getElementsByClassName('_layout_tags_mbhag_1')?.[0]?.clientHeight || 0 // 页签tag高度
    const height3 = document.getElementsByClassName('tableForm')?.[0]?.clientHeight || 0 // tableForm组件高度
    const height4 = 24 // 内容区域上下padding
    const height5 = 48 // 表格内容区域上下padding
    const height6 = document.getElementsByClassName('ant-pagination')?.[0]?.clientHeight || 0 // 分页组件高度
    const height7 = document.getElementsByClassName('ant-table-thead')?.[0]?.clientHeight || 0 // 表头高度
    const height8 = 32 // 分页组件上下margin
    const height9 = 4 // border高度

    const height =
      screenHeight - height1 - height2 - height3 - height4 - height5 - height6 - height7 - height8 - height9

    console.log('计算表格高度:', {
      screenHeight,
      height1,
      height2,
      height3,
      height6,
      height7,
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

  useEffect(() => {
    console.log('useTableHeightFinal 初始化')

    // 重置状态
    calculatedRef.current = false

    // 立即尝试
    setTimeout(() => {
      calculateTableHeight()
    }, 1000)

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
  }, [calculateTableHeight])

  return <RouterProvider router={router} />
}

export default App
