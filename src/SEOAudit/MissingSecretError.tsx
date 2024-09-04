import {Button, Card, Code, Text} from '@sanity/ui'
import {FC, useState} from 'react'
import {SettingsView} from '@sanity/studio-secrets'

import {pluginConfigKeys} from '../utils/configKeys'

export const MissingSecretError: FC<{secretsNamespace: string}> = ({secretsNamespace}) => {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={1}
      tone="critical"
      style={{
        textAlign: 'center',
      }}
    >
      <Text
        align="center"
        size={3}
        style={{
          display: 'block',
          marginBlock: '1em',
        }}
      >
        Missing environment variable
      </Text>

      <Text
        align="center"
        size={3}
        style={{
          display: 'block',
          marginBlock: '1em',
        }}
      >
        <Code
          size={1}
          style={{
            display: 'inline-block',
          }}
        >
          DATA_FOR_SEO_API_KEY
        </Code>
      </Text>

      <Text
        align="center"
        size={1}
        style={{
          display: 'block',
          padding: '1em',
          margin: '0 auto',
          maxWidth: '50em',
        }}
      >
        To use the SEO Audit plugin, you will need to sign up for a{' '}
        <a href="http://dataforseo.com/" target="_blank" rel="noreferrer">
          DataForSEO
        </a>{' '}
        account and obtain an API key. These checks are run using the{' '}
        <a
          href="https://docs.dataforseo.com/v3/on_page/instant_pages"
          target="_blank"
          rel="noreferrer"
        >
          Instant Pages (Live)
        </a>{' '}
        endpoint. Pricing can be{' '}
        <a
          href="https://dataforseo.com/help-center/cost-of-onpage-api-parameters"
          target="_blank"
          rel="noreferrer"
        >
          found here
        </a>
        .
      </Text>

      <Text
        align="center"
        size={1}
        style={{
          display: 'block',
          marginBlock: '1em',
        }}
      >
        <Button onClick={() => setShowSettings(true)}>Add Secret</Button>
      </Text>

      {showSettings && (
        <SettingsView
          title="Preflight: SEO Audit API Key"
          namespace={secretsNamespace}
          keys={pluginConfigKeys}
          onClose={() => {
            setShowSettings(false)
          }}
        />
      )}
    </Card>
  )
}
