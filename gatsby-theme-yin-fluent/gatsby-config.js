module.exports = {
    siteMetadata: {
        title: `Yin Fluent`,
        author: {
          name: `LiYin`,
          summary: `A Human Cat in network.`,
        },
        description: `LiYin Fluent Blog Theme.`,
        siteUrl: `http://localhost:8000/`,
        social: {
          twitter: `wmliyin`,
        },
        disqus: {
          shortname: 'example'
        },
        extralink: [
          
        ]
    },
    plugins: [
      {
        resolve: "gatsby-plugin-react-helmet"
      },
      {
        resolve: "gatsby-plugin-react-helmet-canonical-urls"
      },
      {
        resolve: "gatsby-plugin-next-seo",
        options: {
          openGraph: {
            type: 'website',
            locale: 'zh_CN',
            url: 'https://localhost:8000/',
            site_name: 'Yin Fluent',
          },
        }
      },
      {
        resolve: "gatsby-plugin-typescript"
      },
      {
        resolve: "gatsby-plugin-sharp"
      },
      {
        resolve: "gatsby-transformer-sharp"
      },
      {
        resolve: "gatsby-remark-images",
        options: {
          maxWidth: 590,
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: "data",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: "blog",
          name: `markdown-pages`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: "static",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: "pages",
          name: `markdown-pages`,
        },
      },
      {
        resolve: "gatsby-transformer-yaml",
        options: {
          typeName: "friends",
        },
      },
      {
        resolve: `gatsby-plugin-layout`,
        options: {
          component: require.resolve(`./src/pages/index`),
        },
      },
      {
        resolve: "gatsby-transformer-remark",
        options: {
          commonmark: true,
          footnotes: true,
          pedantic: true,
          gfm: true,
          plugins: [
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                classPrefix: "language-",
                inlineCodeMarker: null,
                aliases: {
                  sh: "bash"
                },
                showLineNumbers: true,
                noInlineHighlight: false,
                languageExtensions: [],
                // Customize the prompt used in shell output
                // Values below are default
                prompt: {
                  user: "root",
                  host: "localhost",
                  global: false,
                },
                // By default the HTML entities <>&'" are escaped.
                // Add additional HTML escapes by providing a mapping
                // of HTML entities and their escape value IE: { '}': '&#123;' }
                escapeEntities: {},
              },
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                // It's important to specify the maxWidth (in pixels) of
                // the content container as this plugin uses this as the
                // base for generating different widths of each image.
                maxWidth: 600,
              }
            },
            {
              resolve: `gatsby-remark-copy-linked-files`,
            },
            {
              resolve: `gatsby-remark-static-images`,
            },
            {
              resolve: "gatsby-remark-component",
              options: { components: ['build-time', 'bangumi-list', 'friends'] }
            }
          ],
        },
      },
    ],
  }

