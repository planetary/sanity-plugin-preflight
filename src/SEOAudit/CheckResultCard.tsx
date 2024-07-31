import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'
import {Box, Code, Popover, Text} from '@sanity/ui'
import {useState} from 'react'

import {defaultSeoValidationRules, ValidationSeverity} from './validations'

type Props = {
  checkName: string
  result: boolean
}

/**
 * Determine the style of the card based on the status of the check
 */
const getStyleByStatus = (isSuccess: boolean, severity: ValidationSeverity = 'error') => {
  if (isSuccess) {
    return {
      fg: 'var(--card-badge-default-fg-color)',
      badgeFg: 'var(--card-badge-positive-fg-color)',
      badgeBg: 'var(--card-badge-positive-bg-color)',
    }
  }

  return {
    fg:
      severity === 'warning'
        ? 'var(--card-badge-caution-fg-color)'
        : 'var(--card-badge-critical-fg-color)',
    badgeFg:
      severity === 'warning'
        ? 'var(--card-badge-caution-fg-color)'
        : 'var(--card-badge-critical-fg-color)',
    badgeBg:
      severity === 'warning'
        ? 'var(--card-badge-caution-bg-color)'
        : 'var(--card-badge-critical-bg-color)',
  }
}

export const CheckResultCard = ({checkName, result}: Props): JSX.Element | null => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const check =
    checkName in defaultSeoValidationRules
      ? defaultSeoValidationRules[checkName as keyof typeof defaultSeoValidationRules]
      : undefined

  if (!check || check === 'off') {
    return null
  }

  const checkPassed = result === check.expected

  let timerId: number | undefined
  const handleMouseEnter = () => {
    window.clearTimeout(timerId)
    setIsTooltipOpen(true)
  }

  const handleMouseLeave = () => {
    timerId = window.setTimeout(() => {
      setIsTooltipOpen(false)
    }, 150)
  }

  const handlePopoverMouseEnter = () => {
    window.clearTimeout(timerId)
  }

  if (result === null || result === undefined) {
    return null
  }

  const cardStyles = getStyleByStatus(checkPassed, check.severity)

  return (
    <div
      style={{
        border: '1px solid var(--card-border-color)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Popover
        open={isTooltipOpen}
        portal
        animate
        placement="right-start"
        onMouseEnter={handlePopoverMouseEnter}
        onMouseLeave={handleMouseLeave}
        content={
          <Box
            padding={2}
            style={{
              maxWidth: '32ch',
            }}
          >
            <Text muted size={1}>
              {check.description}
              <hr style={{opacity: 0.25}} />
              Expected value:{' '}
              <Code style={{display: 'inline-block', verticalAlign: 'middle'}} size={1}>
                {check.expected.toString()}
              </Code>
            </Text>
          </Box>
        }
      >
        <h3
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            color: cardStyles.badgeFg,
            backgroundColor: cardStyles.badgeBg,
            fontSize: '12px',
            margin: '0',
            padding: '8px',
            borderBottom: '1px solid var(--card-border-color)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{check.label}</span>

          {checkPassed ? (
            <CheckmarkCircleIcon
              height={18}
              width={18}
              style={{
                transform: 'scale(1.25)',
              }}
            />
          ) : (
            <CloseCircleIcon
              height={18}
              width={18}
              style={{
                transform: 'scale(1.25)',
              }}
            />
          )}
        </h3>
      </Popover>

      <p
        style={{
          fontSize: '14px',
          margin: '0',
          padding: '8px',
          color: cardStyles.fg,
        }}
      >
        {typeof result === 'boolean' || typeof result === 'number' ? result.toString() : result}
      </p>
    </div>
  )
}
