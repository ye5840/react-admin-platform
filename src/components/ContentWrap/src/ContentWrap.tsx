import type { FC } from 'react'
import { Card } from 'antd'

interface ContentWrapProp {
  config?: objAny
  children?: JSX.Element
  name: string
}
const ContentWrap = (props: ContentWrapProp) => {
  const { config, children, name } = props

  return (
    <div>
      <Card {...config} className={name}>
        {children}
      </Card>
    </div>
  )
}

export default ContentWrap
