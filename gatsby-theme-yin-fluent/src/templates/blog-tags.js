import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { initFluent } from '../utils/init'
initFluent()

const TagsTemplate = ({ location, pageContext, data }) => {
  const { tag } = pageContext
  const children = data
  return (
    <Layout 
        location={location} 
        title={`标签： "${tag}" - ${data.site.siteMetadata.title}`} 
        children={children}
        layout={'tag'} 
        key={"mainLayout"}>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
        siteMetadata {
          title
          author {
            name
          }
        }
    }
    tagpost: allMarkdownRemark(filter: {frontmatter: {tags: {eq: $tag}}}) {
        edges {
          node {
            id
            excerpt(pruneLength: 150)
            frontmatter {
              date(formatString: "YYYY年MM月DD日")
              year: date(formatString: "YYYY")
              month: date(formatString: "MM")
              day: date(formatString: "DD")
              title
              permalink
              thumbnail
            }
          }
        }
    }
}
`

export default TagsTemplate