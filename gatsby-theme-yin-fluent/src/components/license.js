import React from "react"
import { graphql, useStaticQuery } from 'gatsby';
import { MessageBar, MessageBarType, Link } from '@fluentui/react'

const License = ({ pageLicense ,path}) => {
    const globalLicense = useStaticQuery(graphql`
      query {
        site {
            siteMetadata {
              siteUrl
              license
            }
        }
    }
      `)
      let license
      if (pageLicense) {
          license = pageLicense
      } else {
          license = globalLicense.site.siteMetadata.license
      }
        return (
            <MessageBar
                messageBarType={MessageBarType.warning}
            >
                <strong>
                <div dangerouslySetInnerHTML={ { __html: license }}></div>
                <div>本文链接： <Link href={globalLicense.site.siteMetadata.siteUrl + path}>{globalLicense.site.siteMetadata.siteUrl + path}</Link></div>
                </strong>
            </MessageBar>
        )
}

export default License