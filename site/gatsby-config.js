module.exports = {
    siteMetadata: {
        title: `Fluent Issue Example Title`,
        author: {
          name: `Fluent Issue Example Author`,
          summary: `Fluent Issue Example Summary`,
        },
        description: `Fluent Issue Example Description`,
        siteUrl: `https://exmaple.com`,
        social: [
          { title: "Github", icon: "GitGraph", url: "https://github.com/cubesky" }
        ],
        license: "License Footer",
        disqus: {
          shortname: 'example'
        },
        extralink: [
          { name: "Creative Commons", url: "/creativecommons/" },
        ]
    },
    plugins: [
        {
          resolve: "gatsby-theme-yin-fluent"
        },
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            name: `Fluent Issue Example Title`,
            short_name: `FIET`,
            description: `Fluent Issue Example Description`,
            start_url: `/`,
            background_color: `#F7F7F7`,
            theme_color: `#025f52`,
            display: `standalone`,
            icon: `static/images/logo.png`,
            lang: `cn`,
            cache_busting_mode: 'none'
          },
        },
        {
          resolve: `gatsby-plugin-remove-serviceworker`
        }
        // {
        //   resolve: `gatsby-plugin-offline`,
        //   options: {
        //     precachePages: [],
        //     workboxConfig: {
        //       globPatterns: ['**/icons*', '**/images*']
        //     }
        //   },
        // },
    ],
}