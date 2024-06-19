# Dead Links

Find all links in a Sanity document, and ensure that they are reachable.

![Screenshot 2024-06-19 at 09 39 41@2x](https://github.com/planetary/sanity-plugin-link-check/assets/1646307/b8b2aa63-4ad6-480f-b24e-52ffb6ef57b1)

## Configuration

By default the plugin looks for content inside a `content` field in your
document schema.

The field name can be customized by passing a configuration object to the plugin.

```
Preflight({
  plugins: [
    DeadLinks({
      content: "article"
    })
  ]
})
```
