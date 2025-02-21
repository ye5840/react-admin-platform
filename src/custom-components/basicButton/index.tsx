import type { FC } from 'react'
import { Button } from 'antd'

interface BasicButtonProp {
  btnConfig?: objAny
  wrapConfig?: objAny
  children?: JSX.Element
}

const BasicButton = (props: BasicButtonProp) => {
  const { btnConfig, wrapConfig } = props
  return (
    <div {...wrapConfig}>
      {btnConfig &&
        Object.keys(btnConfig).map(key => {
          return (
            <Button {...btnConfig[key]} style={{ marginRight: '10px' }} key={key}>
              {btnConfig[key].name}
            </Button>
          )
        })}
      {props.children}
    </div>
  )
}

export default BasicButton
