import { Card } from 'antd'

interface ContentWrapProp {
  config?: objAny
  children?: JSX.Element
  name: string
}
const ContentWrap = (props: ContentWrapProp) => {
  const { config, children, name } = props

  return (
    <Card {...config} className={name}>
      {children}
    </Card>
  )
}

export default ContentWrap
