import { useEffect, useRef, useCallback } from 'react'
import { useAppDispatch } from '@/stores'
import { setTableHeight } from '@/stores/modules/app'

// 简化版本 - 如果复杂版本有问题可以使用这个
export const useTableHeightSimple = () => {
  const dispatch = useAppDispatch()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const calculateTableHeight = useCallback(() => {
    const screenHeight = document.documentElement.clientHeight
    const height1 = document.getElementsByClassName('ant-layout-header')?.[0]?.clientHeight || 0
    const height2 = document.getElementsByClassName('_layout_tags_mbhag_1')?.[0]?.clientHeight || 0
    const height3 = document.getElementsByClassName('tableForm')?.[0]?.clientHeight || 0
    const height4 = 24
    const height5 = 48
    const height6 = document.getElementsByClassName('ant-pagination')?.[0]?.clientHeight || 0
    const height7 = document.getElementsByClassName('ant-table-thead')?.[0]?.clientHeight || 0
    const height8 = 36

    const height = screenHeight - height1 - height2 - height3 - height4 - height5 - height6 - height7 - height8

    if (height > 100) {
      dispatch(setTableHeight(height))
      return true
    }
    return false
  }, [dispatch])

  useEffect(() => {
    // 多次尝试，确保DOM完全渲染
    const attempts = [1000] // 不同时间点尝试

    attempts.forEach(delay => {
      timeoutRef.current = setTimeout(() => {
        calculateTableHeight()
      }, delay)
    })

    // 监听窗口大小变化
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(calculateTableHeight, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [calculateTableHeight])

  return { calculateTableHeight }
}
