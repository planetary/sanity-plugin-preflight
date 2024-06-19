import {LinkCheckResult} from '.'

/**
 * Check if a link is reachable
 */
export const checkLink = async (url: string): Promise<LinkCheckResult> => {
  try {
    await fetch(url, {method: 'HEAD', mode: 'no-cors'})

    return {
      status: 'success',
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : JSON.stringify(error),
    }
  }
}
