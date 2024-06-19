# sanity-plugin-preflight

> This is a **Sanity Studio v3** plugin.

The Preflight plugin is a modular Sanity document extension for running various checks
prior to publishing content.

Current available checks include:

- [Dead Links](./src/DeadLinks/): Ensure that all links in a document are reachable.
- (WIP) SEO Audit: Automated report for SEO best practices.

![Screenshot 2024-06-19 at 09 39 41@2x](https://github.com/planetary/sanity-plugin-link-check/assets/1646307/b8b2aa63-4ad6-480f-b24e-52ffb6ef57b1)

## Installation

```sh
npm install sanity-plugin-preflight
```

## Usage

Modify your `deskStructure` file to include the following.
If you don't have a custom Structure Builder configuration, please see [the official guide](https://www.sanity.io/guides/getting-started-with-structure-builder):

```ts
// deskStructure.ts
import {Preflight, DeadLinks} from 'sanity-plugin-preflight'
import {RocketIcon} from '@sanity/icons'

export const getDefaultDocumentNode = ({schemaType}) => {
  // Only show the Preflight plugin on selected document types
  if (['article', 'page'].includes(schemaType)) {
    return S.document().views([
      // Include the default content editor
      S.view.form(),

      // Add Preflight plugin
      S.view
        .component(
          Preflight({
            plugins: [DeadLinks()],
          }),
        )
        .title('Preflight')
        .icon(RocketIcon),
    ])
  }

  // Otherwise render the default content editor
  return S.document().views([S.view.form()])
}
```

## License

[MIT](LICENSE) © Planetary

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
