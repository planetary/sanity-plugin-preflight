/* eslint-disable camelcase */

import {Code} from '@sanity/ui'
import {ComponentPropsWithoutRef} from 'react'

import {SEOAuditRuleName} from './SEOAuditTypes'

/**
 * Helper component to render inline code elements in validation descriptions
 */
const InlineCode = (props: ComponentPropsWithoutRef<typeof Code>) => {
  return <Code {...props} style={{display: 'inline-block', verticalAlign: 'middle'}} size={1} />
}

export type ValidationSeverity = 'error' | 'warning' | 'info'

export type SEOValidationRule =
  | {
      label: string
      expected: boolean
      severity?: ValidationSeverity
      description: string | React.ReactNode
    }
  | 'off'
  | false

export type SEOValidationConfig = Record<SEOAuditRuleName, SEOValidationRule>

export const defaultSeoValidationRules: SEOValidationConfig = {
  low_content_rate: {
    label: 'Low Content Rate',
    expected: false,
    description:
      'Indicates whether a page has the plaintext size to page size ratio of less than 0.1.',
  },
  high_content_rate: {
    label: 'High Content Rate',
    expected: false,
    severity: 'warning',
    description:
      'Indicates whether a page has the plaintext size to page size ratio of more than 0.9 available for canonical pages only.',
  },
  low_character_count: {
    label: 'Low Character Count',
    expected: false,
    description: 'Indicates whether the page has less than 1024 characters.',
  },
  high_character_count: {
    label: 'High Character Count',
    expected: false,
    description: 'Indicates whether the page has more than 256,000 characters.',
  },
  small_page_size: {
    label: 'Small Page Size',
    expected: false,
    description:
      'Indicates whether a page is too small. The value will be true if a page size is smaller than 1024 bytes.',
  },
  large_page_size: {
    label: 'Large Page Size',
    expected: false,
    description:
      'Indicates whether a page is too heavy. The value will be true if a page size exceeds 1 megabyte.',
  },
  low_readability_rate: {
    label: 'Low Readability Rate',
    expected: false,
    description:
      'Indicates whether a page is scored less than 15 points on the Flesch–Kincaid readability test.',
  },
  irrelevant_description: {
    label: 'Irrelevant Description',
    expected: false,
    description:
      'Indicates whether a page description tag is irrelevant to the content of a page the relevance threshold is 0.2 available for canonical pages only.',
  },
  irrelevant_title: {
    label: 'Irrelevant Title',
    expected: false,
    description:
      'Indicates whether a page title tag is irrelevant to the content of the page the relevance threshold is 0.3 available for canonical pages only.',
  },
  irrelevant_meta_keywords: {
    label: 'Irrelevant Meta Keywords',
    expected: false,
    description: (
      <>
        Page with irrelevant meta keywords indicates whether a page{' '}
        <InlineCode>keywords</InlineCode> tags are irrelevant to the content of a page the relevance
        threshold is 0.6 available for canonical pages only.
      </>
    ),
  },
  title_too_long: {
    label: 'Title Too Long',
    expected: false,
    description: (
      <>
        Indicates whether the content of the <InlineCode>title</InlineCode> tag exceeds 65
        characters.
      </>
    ),
  },
  title_too_short: {
    label: 'Title Too Short',
    expected: false,
    description: (
      <>
        Indicates whether the content of the <InlineCode>title</InlineCode> tag is shorter than 30
        characters.
      </>
    ),
  },
  lorem_ipsum: {
    label: 'Lorem Ipsum',
    expected: false,
    description: (
      <>
        Indicates whether a page has placeholder / <em>lorem ipsum</em> content.
      </>
    ),
  },
  seo_friendly_url_characters_check: {
    label: 'SEO Friendly URL Characters Check',
    expected: true,
    description:
      'URL characters check-up indicates whether a page URL containing only uppercase and lowercase Latin characters, digits and dashes.',
  },
  seo_friendly_url_dynamic_check: {
    label: 'SEO Friendly URL Dynamic Check',
    expected: true,
    description: (
      <>
        URL dynamic check-up the value will be <InlineCode>true</InlineCode> if a page has no
        dynamic parameters in the url.
      </>
    ),
  },
  seo_friendly_url_keywords_check: {
    label: 'SEO Friendly URL Keywords Check',
    expected: true,
    description: (
      <>
        Indicates whether a page URL is consistent with the <InlineCode>title</InlineCode> meta tag.
      </>
    ),
  },
  seo_friendly_url_relative_length_check: {
    label: 'SEO Friendly URL Relative Length Check',
    expected: true,
    description: (
      <>
        URL length check-up the value will be <InlineCode>true</InlineCode> if a page URL no longer
        than 120 characters.
      </>
    ),
  },
  no_image_alt: {
    label: 'No Image Alt',
    expected: false,
    description: (
      <>
        Will be <InlineCode>true</InlineCode> if page contains images without{' '}
        <InlineCode>alt</InlineCode> tags.
      </>
    ),
  },
  no_image_title: {
    label: 'No Image Title',
    expected: false,
    description: (
      <>
        Will be <InlineCode>true</InlineCode> if page contains images without{' '}
        <InlineCode>title</InlineCode> tags.
      </>
    ),
  },
  no_content_encoding: {
    label: 'No Content Encoding',
    expected: false,
    description: (
      <>
        Indicates whether a page has no{' '}
        <a
          href="http://www.iana.org/assignments/http-parameters/http-parameters.xhtml#content-coding"
          target="_blank"
          rel="noopener noreferrer"
        >
          compression algorithm
        </a>{' '}
        of the content.
      </>
    ),
  },
  high_loading_time: {
    label: 'High Loading Time',
    expected: false,
    description: 'Indicates whether a resource loading time exceeds 3 seconds.',
  },
  is_redirect: {
    label: 'Is Redirect',
    expected: false,
    description: 'Indicates whether a page with a resource has 3XX redirects to other pages.',
  },
  is_4xx_code: {
    label: 'Is 4xx Code',
    expected: false,
    description: (
      <>
        Indicates whether a resource has <InlineCode>4xx</InlineCode> response code.
      </>
    ),
  },
  is_5xx_code: {
    label: 'Is 5xx Code',
    expected: false,
    description: (
      <>
        Indicates whether a resource has <InlineCode>5xx</InlineCode> response code.
      </>
    ),
  },
  is_broken: {
    label: 'Is Broken',
    expected: false,
    description:
      'Indicates whether a page with this resource returns 4xx, 5xx response codes or has broken elements inside the resource.',
  },
  is_www: {
    label: 'Is www',
    expected: true,
    severity: 'warning',
    description: 'Indicates whether a page with this resource is on a www subdomain.',
  },
  has_micromarkup: {
    label: 'Has JSON-LD MicroMarkup',
    expected: true,
    description: 'Indicates whether a page has JSON-LD MicroMarkup.',
  },
  has_micromarkup_errors: {
    label: 'Has JSON-LD MicroMarkup Errors',
    expected: false,
    description: 'Indicates whether a page has JSON-LD MicroMarkup errors.',
  },
  is_https: {
    label: 'Is https',
    expected: true,
    description: 'Page served with https protocol.',
  },
  is_http: {
    label: 'Is http',
    expected: false,
    description: 'Page served with http protocol.',
  },
  high_waiting_time: {
    label: 'High Waiting Time',
    expected: false,
    description:
      'Page with high waiting time indicates whether a page waiting time (aka Time to First Byte) exceeds 1.5 seconds.',
  },
  no_doctype: {
    label: 'No Doctype',
    expected: false,
    description: (
      <>
        Indicates whether a page is without the <InlineCode>{`<!DOCTYPE HTML>`}</InlineCode>{' '}
        declaration.
      </>
    ),
  },
  has_html_doctype: {
    label: 'Has HTML Doctype',
    expected: true,
    description: 'If true, the page has HTML DOCTYPE declaration.',
  },
  canonical: {
    label: 'Canonical',
    expected: true,
    description: 'page is canonical',
  },
  no_encoding_meta_tag: {
    label: 'No Encoding Meta Tag',
    expected: false,
    description: (
      <>
        Indicates whether a page is without Content-Type informative only if the encoding is not
        explicit in the Content-Type header for example:{' '}
        <InlineCode>{`Content-Type: "text/html charset=utf8"`}</InlineCode>.
      </>
    ),
  },
  no_h1_tag: {
    label: 'No H1 Tag',
    expected: false,
    description: 'Page with empty or absent h1 tags.',
  },
  https_to_http_links: {
    label: 'Https To Http Links',
    expected: false,
    description: 'If true, this HTTPS page has links to HTTP pages.',
  },
  size_greater_than_3mb: {
    label: 'Size Greater Than 3mb',
    expected: false,
    description: 'If true, the page size is exceeding 3 MB.',
  },
  meta_charset_consistency: {
    label: 'Meta Charset Consistency',
    expected: true,
    description:
      'If true, the page has meta charset tag that sets character encoding for this page.',
  },
  has_meta_refresh_redirect: {
    label: 'Has Meta Refresh Redirect',
    expected: false,
    description: (
      <>
        If true, the page has <InlineCode>{`<meta http-equiv=”refresh”>`}</InlineCode> tag that
        instructs a browser to load another page after a specified time span.
      </>
    ),
  },
  has_render_blocking_resources: {
    label: 'Has Render Blocking Resources',
    expected: false,
    description: 'If true, the page has render-blocking scripts or stylesheets.',
  },
  has_meta_title: {
    label: 'Has Meta Title',
    expected: true,
    description: (
      <>
        Indicates whether the HTML of a page contains the <InlineCode>meta_title</InlineCode> tag.
      </>
    ),
  },
  deprecated_html_tags: {
    label: 'Deprecated Html Tags',
    expected: false,
    description: (
      <>
        indicates whether a page has{' '}
        <a
          href="https://www.codehelp.co.uk/html/deprecated.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          deprecated HTML tags
        </a>
        .
      </>
    ),
  },
  duplicate_meta_tags: {
    label: 'Duplicate Meta Tags',
    expected: false,
    description:
      'Indicates whether a page has more than one meta tag of the same type available for canonical pages only.',
  },
  duplicate_title_tag: {
    label: 'Duplicate Title Tag',
    expected: false,
    description: (
      <>
        Indicates whether a page has more than one <InlineCode>title</InlineCode> tag.
      </>
    ),
  },
  no_description: {
    label: 'No Description',
    expected: false,
    description: (
      <>
        Indicates whether a page has an empty or absent <InlineCode>description</InlineCode> meta
        tag available for canonical pages only.
      </>
    ),
  },
  no_title: {
    label: 'No Title',
    expected: false,
    description: (
      <>
        Indicates whether a page has an empty or absent <InlineCode>title</InlineCode> tag.
      </>
    ),
  },
  no_favicon: {
    label: 'No Favicon',
    expected: false,
    description: 'page does not have a favicon',
  },
  seo_friendly_url: {
    label: 'SEO Friendly Url',
    expected: true,
    description: (
      <>
        <p>
          Page with seo-friendly URL the ‘SEO-friendliness’ of a page URL is checked by four
          parameters:
        </p>
        <ul style={{padding: '0 0 0 1rem'}}>
          <li>the length of the relative path is less than 120 symbols</li>
          <li>no special characters</li>
          <li>no dynamic parameters</li>
          <li>relevance of the URL to the page</li>
        </ul>
        <p>
          If at least one of them is failed then such URL is considered as not ‘SEO-friendly’ the
          data is available for canonical pages only.
        </p>
      </>
    ),
  },
  flash: {
    label: 'Flash',
    expected: false,
    description: 'Indicates whether a page has flash elements.',
  },
  frame: {
    label: 'Frame',
    expected: false,
    description: (
      <>
        Indicates whether a page contains <InlineCode>frame</InlineCode>,{' '}
        <InlineCode>iframe</InlineCode>, <InlineCode>frameset</InlineCode> tags.
      </>
    ),
  },
} as const

const ruleToSkip: SEOAuditRuleName[] = ['flash']

export const defaultSeoValidations = Object.keys(defaultSeoValidationRules).reduce(
  (config: Record<string, boolean>, validationKey) => {
    return ruleToSkip.includes(validationKey as SEOAuditRuleName)
      ? config
      : {...config, [validationKey]: true}
  },
  {},
)

export const isValidationRule = (rule: unknown): rule is SEOAuditRuleName => {
  return typeof rule === 'string' && rule in defaultSeoValidationRules
}

export const isRuleEnabled = (
  rule?: SEOValidationRule,
): rule is Exclude<SEOValidationRule, false | 'off'> => {
  return Boolean(rule) && rule !== 'off'
}
