import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const SEO = ({article, title}) => {
    const query = useStaticQuery(graphql`
    query {
        site {
          siteMetadata {
            title
            author {
              name
            }
            description
            siteUrl
          }
        }
      }
`)
const seo = query.site.siteMetadata
return (
<>
      <meta name="description" content={seo.description} />
      <meta name="image" content="/images/logo.png" />
      <meta property="og:url" content={seo.siteUrl} />
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {title && <meta property="og:title" content={seo.title} />}
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content="/images/logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content="/images/logo.png" />
</>)
}

export default SEO