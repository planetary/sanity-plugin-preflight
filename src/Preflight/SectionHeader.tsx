import {Badge, Button, Heading} from '@sanity/ui'
import React, {ReactNode} from 'react'

type Props = {
  title: string
  badge?: string
  action?: {
    title: string
    handleClick: () => void
    icon?: React.ReactNode
  }
}

export const SectionHeader = ({title, badge, action}: Props): ReactNode => {
  return (
    <div
      style={{
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Heading as="h2" size={1}>
        {title}
        {badge && <Badge style={{verticalAlign: 'middle', marginLeft: 8}}>{badge}</Badge>}
      </Heading>

      {action && (
        <Button
          onClick={action.handleClick}
          style={{marginLeft: 'auto'}}
          text={action.title}
          tone="default"
          mode="ghost"
          icon={action.icon}
          fontSize={1}
        />
      )}
    </div>
  )
}
