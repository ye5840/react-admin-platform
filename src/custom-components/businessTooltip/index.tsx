import type { ReactNode } from 'react'
import { Tooltip, type TooltipProps } from 'antd'

interface TagOption {
  label: string
  value: string
}

// 定义 maxTagPlaceholder 函数的类型
type MaxTagPlaceholderType = (omittedValues: TagOption[]) => ReactNode

export const renderMaxTagPlaceholder: MaxTagPlaceholderType = omittedValues => {
  const tooltipProps: TooltipProps = {
    title: omittedValues.map(item => item.label).join(', '),
    overlayStyle: { pointerEvents: 'none' }
  }

  return (
    <Tooltip {...tooltipProps}>
      <span>+{omittedValues.length}...</span>
    </Tooltip>
  )
}
