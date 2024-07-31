/**
 * List of all the SEO Audit checks performed by DataForSEO
 * @see https://docs.dataforseo.com/v3/on_page/instant_pages/?bash
 */
export interface SEOAuditChecks {
  no_content_encoding: boolean
  high_loading_time: boolean
  is_redirect: boolean
  is_4xx_code: boolean
  is_5xx_code: boolean
  is_broken: boolean
  is_www: boolean
  is_https: boolean
  is_http: boolean
  high_waiting_time: boolean
  has_micromarkup: boolean
  has_micromarkup_errors: boolean
  no_doctype: boolean
  has_html_doctype: boolean
  canonical: boolean
  no_encoding_meta_tag: boolean
  no_h1_tag: boolean
  https_to_http_links: boolean
  size_greater_than_3mb: boolean
  meta_charset_consistency: boolean
  has_meta_refresh_redirect: boolean
  has_render_blocking_resources: boolean
  low_content_rate: boolean
  high_content_rate: boolean
  low_character_count: boolean
  high_character_count: boolean
  small_page_size: boolean
  large_page_size: boolean
  low_readability_rate: boolean
  irrelevant_description: boolean
  irrelevant_title: boolean
  irrelevant_meta_keywords: boolean
  title_too_long: boolean
  has_meta_title: boolean
  title_too_short: boolean
  deprecated_html_tags: boolean
  duplicate_meta_tags: boolean
  duplicate_title_tag: boolean
  no_image_alt: boolean
  no_image_title: boolean
  no_description: boolean
  no_title: boolean
  no_favicon: boolean
  seo_friendly_url: boolean
  flash: boolean
  frame: boolean
  lorem_ipsum: boolean
  seo_friendly_url_characters_check: boolean
  seo_friendly_url_dynamic_check: boolean
  seo_friendly_url_keywords_check: boolean
  seo_friendly_url_relative_length_check: boolean
}

export type SEOAuditRuleName = keyof SEOAuditChecks
