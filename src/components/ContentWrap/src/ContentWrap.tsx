import { Card } from 'antd'

interface ContentWrapProp {
  config?: objAny
  children?: JSX.Element
}
const ContentWrap = (props: ContentWrapProp) => {
  const { config, children } = props

  return <Card {...config}>{children}</Card>
}

export default ContentWrap
