import {nestLists} from '@portabletext/toolkit'
import {isPortableTextTextBlock, isTypedObject} from 'sanity'

import {isPortableTextLink, LinkKeys} from '../utils/guards'
import {LinkResults} from '.'

/**
 * Retrieve all links from a given Sanity Article document.
 */
export const getDocumentLinks = <K extends Record<string, unknown> = Record<string, unknown>>(
  blocks: unknown,
  linkKeys?: LinkKeys<K>,
): LinkResults => {
  if (!Array.isArray(blocks) || !blocks.every(isTypedObject)) {
    return {}
  }

  const documentLinks = nestLists(blocks, 'direct')

  return documentLinks.reduce((links: LinkResults, block) => {
    const markDefs = isPortableTextTextBlock(block) && block.markDefs ? block.markDefs : undefined

    if (markDefs) {
      const markLinks = markDefs?.reduce((marks, mark) => {
        let isMarkLink = false
        let linkKey: LinkKeys<K>[number] = 'href'

        // check for different user-provided link keys
        if (linkKeys && linkKeys.length) {
          for (const key of linkKeys) {
            if (key in mark) {
              isMarkLink = true
              linkKey = key
              break // stop checking after first match
            }
          }
        } else {
          isMarkLink = isPortableTextLink(mark)
        }
        // Avoid checking the same link multiple times
        // not sure about the type coercion as K and the string type check here
        // maybe there's a better way?
        const linkAttribute = isMarkLink && (mark as unknown as K)[linkKey] // first check if the key exists
        const isLinkString = typeof linkAttribute === 'string'
        const isDuplicate = linkAttribute && isLinkString && links[linkAttribute]

        if (isMarkLink && isLinkString && !isDuplicate) {
          return {...marks, [linkAttribute]: {status: 'initial'}}
        }

        return marks
      }, {})

      return {
        ...links,
        ...markLinks,
      }
    }
    return links
  }, {})
}
