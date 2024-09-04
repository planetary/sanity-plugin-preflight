import {useSecrets} from '@sanity/studio-secrets'
import {SanityDocument} from 'sanity'
import {UserViewComponent} from 'sanity/structure'

import {SectionHeader} from '../Preflight/SectionHeader'
import {PreflightPlugin} from '../Preflight/types'
import {MissingSecretError} from './MissingSecretError'
import {SEOAuditResults} from './SEOAuditResults'
import {defaultSeoValidationRules, SEOValidationConfig} from './validations'

export type LinkStatus = 'initial' | 'checking' | 'success' | 'error'
export type LinkCheckResult = {
  status: LinkStatus
  message?: string
}
export type LinkResults = Record<string, LinkCheckResult>

export type SEOAuditConfig = {
  /**
   * Configure, disable, and override the default SEO validation rules.
   * Will be merged with the default rules found in `validations.tsx`.
   * Default value: `defaultSeoValidationRules`
   */
  rules?: Partial<SEOValidationConfig>

  /**
   * The base URL to use when checking links.
   * Default value: `process.env.SANITY_STUDIO_SERVER_HOSTNAME` or `window.location.origin`
   */
  baseUrl?: string

  /**
   * A function that returns the URL to check.
   * Receives the active Sanity document, draft status, and baseUrl as an arguments.
   */
  getDocumentSlug?: (document: Partial<SanityDocument>, isDraft?: boolean) => string

  /**
   * The Sanity schema field name containing the array of content blocks in the document.
   * Default value: `SANITY_SECRETS`
   */
  secretsNamespace: string
}

type Props = UserViewComponent['defaultProps']

const Extracted = ({config, document}: {config: SEOAuditConfig} & Props) => {
  const {secrets} = useSecrets<Record<string, string>>(config.secretsNamespace)
  const API_KEY = btoa(`${secrets?.DATA_FOR_SEO_API_LOGIN}:${secrets?.DATA_FOR_SEO_API_PASSWORD}`)

  if (!secrets?.DATA_FOR_SEO_API_LOGIN) {
    return (
      <div>
        <SectionHeader title="SEO Audit" />

        <MissingSecretError secretsNamespace={config.secretsNamespace} />
      </div>
    )
  }

  if (!document?.displayed) {
    return (
      <div>
        <SectionHeader title="SEO Audit" />
        <p>No document found</p>
      </div>
    )
  }

  const isDraft = document.displayed._id?.startsWith('drafts.')
  const slug =
    config.getDocumentSlug?.(document.displayed, isDraft) ??
    ((document.displayed.slug as unknown as {current: string})?.current as unknown as string)

  if (!slug) {
    return (
      <div>
        <SectionHeader title="SEO Audit" />
        <p>No slug found</p>
      </div>
    )
  }

  return <SEOAuditResults {...config} apiKey={API_KEY} publicUrl={slug} />
}

/**
 * A plugin that checks the status of all links in a document,
 * ensuring that they are reachable.
 */
const SEOAuditPlugin = Extracted

const defaultConfig: SEOAuditConfig = {
  secretsNamespace: 'SANITY_SECRETS',
  rules: defaultSeoValidationRules,
}

export const SEOAudit = (
  config: Pick<SEOAuditConfig, 'rules' | 'baseUrl' | 'getDocumentSlug'> & {
    secretsNamespace?: string
  } = defaultConfig,
): PreflightPlugin => {
  const WithConfigWrapper = (props: Props) => {
    return (
      <SEOAuditPlugin
        config={{
          ...defaultConfig,
          ...config,
          rules: {...defaultConfig.rules, ...config.rules},
        }}
        {...props}
      />
    )
  }

  WithConfigWrapper.displayName = 'SEOAudit'
  return WithConfigWrapper
}
