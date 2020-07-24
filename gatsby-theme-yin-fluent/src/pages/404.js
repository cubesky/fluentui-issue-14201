import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import "../styles/styles.css"

import { initFluent } from '../utils/init'
initFluent()

const BlogNotFound = ({ data, location, pageContext }) => {
    return (
    <Layout 
      location={location} 
      title={data.site.siteMetadata.title}
      layout={'404'}
      key={"mainLayout"}
    />)
}

export default BlogNotFound

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`