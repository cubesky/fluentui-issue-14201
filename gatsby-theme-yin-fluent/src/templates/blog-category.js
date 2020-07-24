import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

import { initFluent } from '../utils/init'
initFluent()

const CategoryTemplate = ({ location, pageContext, data }) => {
  const { category } = pageContext
  const children = data
  return (
    <Layout 
        location={location} 
        title={`分类： "${category}" - ${data.site.siteMetadata.title}`} 
        children={children}
        layout={'category'} 
        key={"mainLayout"}>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    site {
        siteMetadata {
          title
          author {
            name
          }
        }
    }
    categorypost: allMarkdownRemark(filter: {frontmatter: {categories: {eq: $category}}}) {
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

export default CategoryTemplate