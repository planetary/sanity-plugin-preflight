import {RefreshIcon} from '@sanity/icons'
import {Card, Code, Flex, Spinner, Text} from '@sanity/ui'
import {useCallback, useState} from 'react'

import {SectionHeader} from '../Preflight/SectionHeader'
import {SEOAuditConfig} from '.'
import {CheckResultCard} from './CheckResultCard'
import {InitialLoadMessage} from './InitialLoadMessage'
import {SEOAuditChecks} from './SEOAuditTypes'
import {getPageLiveResult} from './seoClient'
import {defaultSeoValidationRules, isRuleEnabled, isValidationRule} from './validations'

type Props = SEOAuditConfig & {
  apiKey: string
  publicUrl: string
}

export const SEOAuditResults = ({publicUrl, apiKey, rules}: Props): JSX.Element => {
  const isLocalhost = publicUrl?.includes('localhost') || publicUrl?.includes('127.0.0')

  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<Partial<SEOAuditChecks>>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getPageAudit = useCallback(async () => {
    if (isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const liveResults = await getPageLiveResult(apiKey)(publicUrl, isLocalhost)
      const checks: SEOAuditChecks | undefined =
        liveResults?.tasks?.[0]?.result?.[0]?.items?.[0]?.checks

      if (checks) {
        const result: Partial<SEOAuditChecks> = Object.entries(checks).reduce(
          (filteredResults: Partial<SEOAuditChecks>, [key, value]) => {
            if (!rules || (isValidationRule(key) && isRuleEnabled(rules[key]))) {
              return {
                ...filteredResults,
                [key]: value,
              }
            }

            return filteredResults
          },
          {},
        )

        setResults(result)
        setErrorMessage(null)
      }
    } catch (error) {
      console.error('Failed to get page audit', error)
      if (error instanceof Error) {
        setErrorMessage(`Failed to get page audit\n${error.message}`)
      }
    }

    setIsLoading(false)
  }, [isLoading, apiKey, publicUrl, isLocalhost, rules])

  const resultsArray = Object.entries(results ?? {})
  const totalCheckCount =
    resultsArray.length > 0 ? resultsArray.length : Object.keys(rules ?? {}).length

  // Filter out the results that are both enabled and match the expected value
  const successfulChecks = resultsArray.filter(([rule, result]) => {
    const ruleName = rule as keyof SEOAuditChecks
    const ruleConfig = defaultSeoValidationRules[ruleName]

    return isValidationRule(ruleName) && isRuleEnabled(ruleConfig) && result === ruleConfig.expected
  }).length

  const badge = results
    ? `${successfulChecks}/${totalCheckCount} checks passed`
    : `${totalCheckCount} checks available`

  return (
    <>
      <SectionHeader
        title="SEO Audit"
        badge={badge}
        action={{
          handleClick: getPageAudit,
          title: 'Run audit',
          icon: <RefreshIcon />,
        }}
      />

      {isLocalhost && (
        <Card padding={3} radius={2} shadow={1} tone="caution" marginTop={4} marginBottom={4}>
          <Text align="center" size={2}>
            SEO Audit shows demo data on localhost. Run the audit on a deployed Sanity Studio site
            to see actual results.
          </Text>
        </Card>
      )}

      {errorMessage && (
        <Card padding={3} radius={2} shadow={1} tone="caution" marginTop={4} marginBottom={4}>
          <Code
            size={1}
            style={{
              display: 'inline-block',
            }}
          >
            {errorMessage}
          </Code>
        </Card>
      )}

      {!results && !isLoading && !errorMessage && <InitialLoadMessage handleClick={getPageAudit} />}

      {isLoading && (
        <Card padding={4}>
          <Flex align="center" justify="center" gap={2}>
            <Spinner muted /> <span>Analyzing page…</span>
          </Flex>
        </Card>
      )}

      {resultsArray.length > 0 && (
        <div
          style={{
            margin: '24px 0',
            width: '100%',
            gap: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          {resultsArray.map(([key, result]) => (
            <CheckResultCard key={key} checkName={key} result={result} />
          ))}
        </div>
      )}
    </>
  )
}
