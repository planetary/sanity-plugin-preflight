/* eslint-disable camelcase */

import {OnPageApi, OnPageTaskRequestInfo} from 'dataforseo-client'

const apiHost = 'https://api.dataforseo.com'
const demoHost = 'https://sandbox.dataforseo.com'

const authenticatedFetch =
  (apiKey: string) =>
  (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    const authHeader = {Authorization: `Basic ${apiKey}`}

    const newInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        ...authHeader,
      },
    }

    return fetch(url, newInit)
  }

const getOnPageClient = (apiKey: string) => {
  return new OnPageApi(apiHost, {fetch: authenticatedFetch(apiKey)})
}

const getOnPageDemoClient = (apiKey: string) => {
  return new OnPageApi(demoHost, {fetch: authenticatedFetch(apiKey)})
}

/**
 * Get the live results of a page audit
 * @see https://docs.dataforseo.com/v3/on_page/instant_pages
 */
export const getPageLiveResult =
  (apiKey: string) =>
  async (pageURL: string, isDemoMode: boolean): Promise<OnPageTaskRequestInfo | null> => {
    const onPageClient = isDemoMode ? getOnPageDemoClient(apiKey) : getOnPageClient(apiKey)

    const task = new OnPageTaskRequestInfo({
      url: pageURL,
      max_crawl_pages: 1,
      check_spell: true,
      validate_micromarkup: true,
    })

    return onPageClient.instantPages([task])
  }
