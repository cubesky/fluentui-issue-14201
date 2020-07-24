exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const blogPostTemplate = require.resolve(`./src/templates/blog-post.js`)
    const blogCategoryTemplate = require.resolve('./src/templates/blog-category.js')
    const blogTagsTemplate = require.resolve('./src/templates/blog-tags.js')
    const result = await graphql(`
      {
        post: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              id
              frontmatter {
                isPage
                permalink
                year: date(formatString: "YYYY")
                month: date(formatString: "MM")
                day: date(formatString: "DD")
              }
            }
          }
        }
        categoriesGroup: allMarkdownRemark(limit: 2000, filter: {frontmatter: {isPage: {eq: false}}}) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000, filter: {frontmatter: {isPage: {eq: false}}}) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `)
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    result.data.post.edges.forEach(({ node }) => {
      let link
      let url
      if (node.frontmatter.permalink) {
        link = node.frontmatter.permalink
      } else {
        link = node.id
      }
      if (node.frontmatter.isPage) {
        if (node.frontmatter.permalink) {
          url = '/' + link
        } else {
          reporter.panicOnBuild(`Error while generate markdown page.`)
          return
        }
      } else {
        url = '/' + node.frontmatter.year + '/' + node.frontmatter.month + '/' + node.frontmatter.day + "/" + link
      }
      console.log('Creating > ' + url)
      createPage({
        path: url,
        component: blogPostTemplate,
        context: {
          permalink: node.frontmatter.permalink,
        },
      })
    })
    result.data.categoriesGroup.group.forEach((group) => {
      const categoriesUrl = `/categories/${group.fieldValue}/`
      console.log('Creating > ' + categoriesUrl)
      createPage({
        path: categoriesUrl,
        component: blogCategoryTemplate,
        context: {
          category: group.fieldValue,
        },
      })
    })
    result.data.tagsGroup.group.forEach((tag) => {
      const tagsUrl = `/tags/${tag.fieldValue}/`
      console.log('Creating > ' + tagsUrl)
      createPage({
        path: tagsUrl,
        component: blogTagsTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })
  }