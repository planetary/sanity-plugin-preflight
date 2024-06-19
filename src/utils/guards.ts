import {PortableTextBlock, PortableTextObject, TypedObject} from 'sanity'

type PortableTextLink = {
  _type: 'link'
  _key: string
  href: string
}

export const isPortableTextLink = (mark: PortableTextObject): mark is PortableTextLink => {
  return Boolean(mark._type === 'link' && 'href' in mark)
}

export type ContentBlock = PortableTextBlock | TypedObject
