import React from "react"
import {
    DocumentCardType,DocumentCardPreview,DocumentCard,DocumentCardActivity,DocumentCardTitle,DocumentCardDetails,ImageFit
} from '@fluentui/react';
import SocialBtn from './socialbtn'
import { graphql, useStaticQuery } from "gatsby"

const SmIdentity = () => {
    const siteData = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
              title
              author {
                summary
                name
              }
              description
            }
        }
    }
    `)
    const imageProp = {
        name: siteData.site.siteMetadata.title,
        width: 106,
        previewImageSrc: '/images/logo.png',
      }
      const people = { name: siteData.site.siteMetadata.author.name, profileImageSrc: '/images/head.png', initials: 'LY' }
    return (
        <>
        <DocumentCard
        aria-label={`${siteData.site.siteMetadata.description} ${siteData.site.siteMetadata.author.summary}`}
        type={DocumentCardType.compact}
        styles={{root: { maxWidth: '100%' }}}
        >
        <DocumentCardPreview previewImages={[imageProp]} imageFit={ImageFit.cover} />
        <DocumentCardDetails>
          <DocumentCardTitle title={siteData.site.siteMetadata.description} className="ly-sm-identity" />
          <DocumentCardActivity activity={siteData.site.siteMetadata.author.summary} people={[people]} />
        </DocumentCardDetails>
        </DocumentCard>
        <div className="ly-lr-p-1"><SocialBtn type={`texticon`} align={`center`}/></div>
        </>
    )
}

export default SmIdentity