import {Button, Card, Text} from '@sanity/ui'

type Props = {
  handleClick: () => void
}

export const InitialLoadMessage = ({handleClick}: Props): JSX.Element => {
  return (
    <Card
      padding={[3, 3, 4]}
      radius={2}
      shadow={1}
      tone="default"
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
        Generate an automated report on how well a particular page is optimized for organic search
      </Text>

      <Button onClick={handleClick}>Run audit</Button>
    </Card>
  )
}
