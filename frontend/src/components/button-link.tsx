import type { ButtonProps } from 'antd'
import { createLink } from '@tanstack/react-router'
import { Button } from 'antd'
import * as React from 'react'

const ButtonLink = createLink(
  React.forwardRef(
    (props: ButtonProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
      return <Button ref={ref} {...props} />
    },
  ),
)

export default ButtonLink
