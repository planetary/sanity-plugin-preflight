import {
  CheckmarkCircleIcon,
  CloseCircleIcon,
  EllipsisHorizontalIcon,
  TransferIcon,
} from '@sanity/icons'
import {ReactNode} from 'react'

import {LinkStatus} from '.'

export const StatusIcon = ({status}: {status: LinkStatus}): ReactNode => {
  switch (status) {
    case 'checking':
      return <TransferIcon height={16} width={16} />
    case 'success':
      return <CheckmarkCircleIcon height={16} width={16} />
    case 'error':
      return <CloseCircleIcon height={16} width={16} />
    case 'initial':
    default:
      return <EllipsisHorizontalIcon height={16} width={16} />
  }
}
