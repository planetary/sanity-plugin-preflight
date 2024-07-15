# SEO Audit

Generate an automated report on how well a particular page is optimized for organic search.

> Note that this relies on a paid third party service, [DataForSEO](http://dataforseo.com) to generate the report.

![Screenshot 2024-07-15 at 03 45 53@2x](https://github.com/user-attachments/assets/185f5b19-a943-4618-bc8e-4d198ee2f583)

## Configuration

Add it to the `Preflight` plugin configuration:

```js
Preflight({
  plugins: [
    SEOAudit({
      // The base URL of the site
      baseUrl: 'https://example.org',
      // Override default rule configuration
      rules: {
        // For full list see: ./validations.tsx
        // Disable a rule
        flash: 'off',
        // Override a rule
        is_www: {
          label: 'Compact domain',
          description: 'The domain should not include www',
          severity: 'error',
          expected: false,
        },
      },
    }),
  ],
})
```

## DataForSEO API key

> Quick config: Create a new secret named `DATA_FOR_SEO_API_KEY` using `@sanity/studio-secrets` plugin.

To use the SEO Audit plugin, you will need to sign up for a [DataForSEO](http://dataforseo.com) account and obtain an API key.

These checks are run using the [Instant Pages (Live)](https://docs.dataforseo.com/v3/on_page/instant_pages) endpoint. Pricing can be [found here](https://dataforseo.com/help-center/cost-of-onpage-api-parameters).

Usage of this service requires registration and creation of an API key, however usage with placeholder/sandbox data doesn't require payment.

To create and set an API key, [follow the instructions here](https://docs.dataforseo.com/v3/auth/).

For security, secrets are managed using the [`studio-secrets` plugin](https://github.com/sanity-io/sanity-studio-secrets), since Sanity Studio is a client-side application
and does not have server-side capabilities to securely store secrets.

Follow the instructions in the `studio-secrets` plugin to create a new secret named `DATA_FOR_SEO_API_KEY`.

This API key only needs to be set once by the project administrator, and will be shared by all content editors.

### Secrets Namespace

The secrets namespace used can be configured by passing a `secretsNamespace` option to the `Preflight` plugin.

By default the plugin will look for it under the `SANITY_SECRETS` namespace.

```js
Preflight({
  plugins: [
    SEOAudit({
      secretsNamespace: 'MY_SANITY_SECRETS',
      // Rest of the configuration…
    }),
  ],
})
```

## Draft/Unpublished Documents

DataForSEO requires a publicly accessible URL to generate the report, as they
access the page using a headless browser to generate the report.

If you are working with draft or unpublished documents, you will need to support
a way for DataForSEO to access these documents.
The exact method will depend on your site generator, but here is how you may do so using Next.js:

### Draft articles with Next.js `app` router served on Vercel

First we will configure Next.js to serve draft articles for requests coming in from DataForSEO servers.

```ts
// app/api/draft/route.ts

// Based on https://nextjs.org/docs/app/building-your-application/configuring/draft-mode#securely-accessing-it-from-your-headless-cms
// route handler with secret and slug
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { seoAuditIPs } from '@planetary/sanity-plugin-preflight'

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (
    !slug ||
    (
      secret !== 'MY_SECRET_TOKEN' ||
      !seoAuditIPs.includes(request.headers.get('x-vercel-forwarded-for')
    )
  ) {
    return new Response('Invalid token', { status: 401 })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostBySlug(slug)

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!post) {
    return new Response('Invalid slug', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(post.slug)
}
```

Next, we'll the SEOAudit plugin to hit the draft route when it detects a draft document,
and pass the desired article as a query parameter.

```ts
Preflight({
  plugins: [
    SEOAudit({
      baseUrl: 'https://example.org',
      getDocumentSlug: (document, isDraft) => {
        if (isDraft) {
          return `/draft/route?slug=${document.slug.current}`
        }

        return document.slug.current
      },
      rules: {
        // Disable the redirect rule as it will always fail for draft documents
        is_redirect: 'off',
      },
    }),
  ],
})
```
