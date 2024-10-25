import type { FC } from 'react'
import { Card } from 'antd'

interface ContentWrapProp {
  config?: objAny
  children?: JSX.Element
}
const ContentWrap = (props: ContentWrapProp) => {
  const { config, children } = props

  return (
    <div>
      <Card {...config}>{children}</Card>
    </div>
  )
}

export default ContentWrap
