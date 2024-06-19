import {RefreshIcon} from '@sanity/icons'
import {useState} from 'react'
import {UserViewComponent} from 'sanity/structure'

import {SectionHeader} from '../Preflight/SectionHeader'
import {PreflightPlugin} from '../Preflight/types'
import {getStyleByStatus} from '../utils/getStyleByStatus'
import {checkLink} from './checkLink'
import {getDocumentLinks} from './getDocumentLinks'
import {StatusIcon} from './StatusIcon'

export type LinkStatus = 'initial' | 'checking' | 'success' | 'error'
export type LinkCheckResult = {
  status: LinkStatus
  message?: string
}
export type LinkResults = Record<string, LinkCheckResult>

type Config = {
  /**
   * The Sanity schema field name containing the array of content blocks in the document.
   * Default value: 'content'
   */
  content: string
}

type Props = UserViewComponent['defaultProps']

/**
 * A plugin that checks the status of all links in a document,
 * ensuring that they are reachable.
 */
const DeadLinksPlugin = ({config, ...props}: Props & {config: Config}) => {
  const contentBlocks = props?.document?.displayed[config.content] || []

  const [linkResults, setLinkResults] = useState<LinkResults>(getDocumentLinks(contentBlocks))

  const resultsArray = Object.entries(linkResults)
  const isInitial = resultsArray.every(([, status]) => status.status === 'initial')
  const successCount = resultsArray.filter(([, status]) => status.status === 'success').length

  const checkAllLinks = async () => {
    const linkEntries = Object.entries(linkResults)

    for (const [link, check] of linkEntries) {
      if (check.status !== 'checking') {
        setLinkResults((prev) => ({...prev, [link]: {status: 'checking'}}))
        const result = await checkLink(link)
        setLinkResults((prev) => ({...prev, [link]: result}))
      }
    }
  }

  return (
    <div>
      <SectionHeader
        title="Links"
        badge={
          isInitial
            ? `Found ${resultsArray.length} link(s)`
            : `${successCount}/${resultsArray.length} links are valid`
        }
        action={{
          handleClick: checkAllLinks,
          title: 'Check all links',
          icon: <RefreshIcon />,
        }}
      />

      <p
        style={{
          color: 'var(--card-default-fg-color)',
          fontSize: '14px',
        }}
      >
        Check the status of all links in the document, ensuring that they are reachable.
      </p>

      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {resultsArray.map(([link, {status, message}]) => (
          <li
            key={link}
            style={{
              fontFamily: 'monospace',
              marginBlock: 8,
            }}
          >
            <div
              style={{
                borderRadius: '4px',
                display: 'inline-flex',
                gap: 8,
                flexDirection: 'row',
                lineHeight: 1.15,
                padding: '4px 8px',
                borderBottom: '1px solid var(--card-border-color)',
                color: getStyleByStatus(status)({
                  default: 'var(--card-badge-default-fg-color)',
                  success: 'var(--card-badge-positive-fg-color)',
                  error: 'var(--card-badge-critical-fg-color)',
                  warning: 'var(--card-badge-warning-bg-color)',
                }),
                backgroundColor: getStyleByStatus(status)({
                  default: 'var(--card-badge-default-bg-color)',
                  success: 'var(--card-badge-positive-bg-color)',
                  error: 'var(--card-badge-critical-bg-color)',
                }),
              }}
            >
              <span>
                <StatusIcon status={status} />
              </span>

              <div
                style={{
                  display: 'inline-flex',
                  gap: 4,
                  flexDirection: 'column',
                }}
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {link}
                </a>

                {status !== 'success' && message && (
                  <p style={{display: 'inline-block', margin: 0}}>{message}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const defaultConfig: Config = {
  content: 'content',
}

export const DeadLinks = (config: Config = defaultConfig): PreflightPlugin => {
  const WithConfigWrapper = (props: Props) => {
    return <DeadLinksPlugin config={config} {...props} />
  }

  WithConfigWrapper.displayName = 'DeadLinks'
  return WithConfigWrapper
}
