import type { LinkProps } from '@tanstack/react-router'
import { router } from '@/main'
import { Typography } from 'antd'
import React from 'react'

interface NavigationCardProps {
  icon: React.ReactNode
  title: string
  description: string
  to: LinkProps['to']
}

export default function NavigationCard({ icon, title, description, to }: NavigationCardProps) {
  return (
    <div className="border-2 p-4 bg-white h-fit rounded hover:border-primary transition-colors cursor-pointer space-y-2" onClick={() => router.navigate({ to })}>
      <div className="text-3xl text-secondary">
        {icon}
      </div>
      <Typography.Title className="!mb-0" level={5}>{title}</Typography.Title>
      <Typography.Paragraph className="!mb-0" type="secondary">
        {description}
      </Typography.Paragraph>
    </div>
  )
}
