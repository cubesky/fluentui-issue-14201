import * as React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "../styles/styles.css"

import { initFluent } from '../utils/init'
initFluent()
const BlogTags = ({ data, location }) => {
    const title = '标签 - ' + data.site.siteMetadata.title
    const layout = 'tags'
    const children = { title: `标签 - ${data.site.siteMetadata.title}`,tags: data.tagsGroup.group.map((tag) => tag.fieldValue)}
    return (
    <Layout 
      location={location} 
      title={title}
      children={children}
      layout={layout}
      key={"mainLayout"}
    />)
}

export default BlogTags

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000, filter: {frontmatter: {isPage: {eq: false}}}) {
        group(field: frontmatter___tags) {
          fieldValue
        }
    }
  }
`