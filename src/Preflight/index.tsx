import {Fragment} from 'react'
import {UserViewComponent} from 'sanity/structure'

import {PreflightPlugin} from './types'

type Config = {
  plugins: PreflightPlugin[]
}

type Props = UserViewComponent['defaultProps']

const PreflightBase = ({config, ...props}: Props & {config: Config}) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '24px',
      }}
    >
      {config.plugins.map((plugin, index) => {
        const isNotLastChild = index < config.plugins.length - 1

        return (
          <Fragment key={plugin.name}>
            {plugin(props)}

            {isNotLastChild && (
              <hr
                style={{
                  margin: '32px 0',
                  border: 'none',
                  borderBottom: '1px solid var(--card-border-color)',
                }}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
PreflightBase.displayName = 'Preflight'

export const Preflight = (config: Config): typeof PreflightBase => {
  const WithConfigWrapper = (props: Props) => {
    return <PreflightBase config={config} {...props} />
  }

  WithConfigWrapper.displayName = 'Preflight'
  return WithConfigWrapper
}
