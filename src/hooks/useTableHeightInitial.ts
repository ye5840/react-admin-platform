import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

export const useTableHeightInitial = () => {
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

    console.log('计算表格高度:', {
      screenHeight,
      height1,
      height2,
      height3,
      calculatedHeight: height,
      timestamp: new Date().toISOString()
    })

    // 即使没有关键元素，也设置一个合理的高度
    if (height > 0) {
      dispatch(setTableHeight(height))
      calculatedRef.current = true
      return true
    }

    return false
  }, [dispatch])

  useEffect(() => {
    console.log('useTableHeightInitial 初始化')

    // 立即尝试
    calculateTableHeight()

    // 如果立即尝试失败，使用多种策略
    if (!calculatedRef.current) {
      // 策略1: 等待下一个事件循环
      const nextTick = () => {
        requestAnimationFrame(() => {
          calculateTableHeight()
        })
      }

      // 策略2: 等待 DOM 更新
      const waitForDOM = () => {
        setTimeout(() => {
          calculateTableHeight()
        }, 0)
      }

      // 策略3: 等待 React 渲染完成
      const waitForReact = () => {
        setTimeout(() => {
          calculateTableHeight()
        }, 10)
      }

      // 策略4: 等待布局完成
      const waitForLayout = () => {
        setTimeout(() => {
          calculateTableHeight()
        }, 50)
      }

      // 策略5: 等待样式应用
      const waitForStyles = () => {
        setTimeout(() => {
          calculateTableHeight()
        }, 100)
      }

      // 策略6: 等待 Ant Design 组件渲染
      const waitForAntd = () => {
        setTimeout(() => {
          calculateTableHeight()
        }, 200)
      }

      // 策略7: 等待路由组件渲染
      const waitForRoute = () => {
        setTimeout(() => {
          calculateTableHeight()
        }, 500)
      }

      // 执行所有策略
      nextTick()
      waitForDOM()
      waitForReact()
      waitForLayout()
      waitForStyles()
      waitForAntd()
      waitForRoute()
    }

    // 监听窗口大小变化
    const handleResize = () => {
      calculateTableHeight()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [calculateTableHeight])

  return { calculateTableHeight }
}
