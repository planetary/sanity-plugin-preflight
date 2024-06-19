import {nestLists} from '@portabletext/toolkit'
import {isPortableTextTextBlock, isTypedObject} from 'sanity'

import {isPortableTextLink} from '../utils/guards'
import {LinkResults} from '.'

/**
 * Retrieve all links from a given Sanity Article document.
 */
export const getDocumentLinks = (blocks: unknown): LinkResults => {
  if (!Array.isArray(blocks) || !blocks.every(isTypedObject)) {
    return {}
  }

  const documentLinks = nestLists(blocks, 'direct')

  return documentLinks.reduce((links: LinkResults, block) => {
    const markDefs = isPortableTextTextBlock(block) && block.markDefs ? block.markDefs : undefined

    if (markDefs) {
      const markLinks = markDefs?.reduce((marks, mark) => {
        const isMarkLink = isPortableTextLink(mark)
        // Avoid checking the same link multiple times
        const isDuplicate = isMarkLink && links[mark.href]

        if (isMarkLink && !isDuplicate) {
          return {...marks, [mark.href]: {status: 'initial'}}
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
