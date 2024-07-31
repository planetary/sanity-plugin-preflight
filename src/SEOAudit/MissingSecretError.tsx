import {Card, Code, Text} from '@sanity/ui'

export const MissingSecretError = () => {
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
          marginBlock: '1em',
        }}
      >
        Please add it using{' '}
        <a href="https://github.com/sanity-io/sanity-studio-secrets">
          sanity-studio-secrets plugin
        </a>
        .
      </Text>
    </Card>
  )
}
