import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import { initFluent } from '../utils/init'
initFluent()

const BlogPostTemplate = ({ data, location }) => {
  return (
      <Layout 
        title={data.site.siteMetadata.title} 
        location={location} 
        children={data}
        layout={'post'}
        key={"mainLayout"}
      />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPost($permalink: String) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    post: markdownRemark(frontmatter: {permalink: {eq: $permalink}}) {
        id
        excerpt(pruneLength: 150)
        htmlAst
        frontmatter {
          title
          date(formatString: "YYYY年MM月DD日")
          permalink
          comment
          outdate
          categories
          tags
        }
      }
  }
`