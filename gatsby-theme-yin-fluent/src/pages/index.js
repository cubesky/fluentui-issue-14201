import * as React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "../styles/styles.css"
import { initFluent } from '../utils/init'
initFluent()
const BlogIndex = ({ data, location, pageContext }) => {
    let title
    let layout
    let children
    if (data === undefined) return <>undefined</>
    if ('post' in data) {
      layout = 'post'
      title = data.post.frontmatter.title + ' - ' + data.site.siteMetadata.title
      children = {
        location: location.pathname, 
        author: data.site.siteMetadata.author.name, 
        post: data.post
      }
    } else if ('categorypost' in data) {
      layout = 'category'
      const { category } = pageContext
      title = `分类：${category} - ${data.site.siteMetadata.title}`
      children = data.categorypost.edges
    } else if ('tag' in data || 'tagpost' in data) {
      layout = 'tag'
      let { tag } = pageContext
      title = `标签：${tag} - ${data.site.siteMetadata.title}`
      children = data.tagpost.edges
    } else if ('tagsGroup' in data) {
      layout = 'tags'
      title = `标签 - ${data.site.siteMetadata.title}`
      children = data.tagsGroup.group.map((tag) => tag.fieldValue)
    } else if ('allMarkdownRemark' in data) {
      title = data.site.siteMetadata.title
      layout = 'index'
      children = data.allMarkdownRemark.edges
    } else {
      title = data.site.siteMetadata.title
      layout = '404'
    }
    return (
    <Layout 
      location={location} 
      title={title}
      children={children}
      layout={layout}
      key={"mainLayout"}
    />)
}

export default BlogIndex

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
    allMarkdownRemark(filter: {frontmatter: {isPage: {eq: false}}}, sort: { order: DESC, fields: [frontmatter___date] }) {
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