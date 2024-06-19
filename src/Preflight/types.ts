import {ReactNode} from 'react'
import {UserViewComponent} from 'sanity/structure'

export type PreflightPlugin = (props: UserViewComponent['defaultProps']) => ReactNode
