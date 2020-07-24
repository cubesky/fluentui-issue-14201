import React from "react"
import { graphql, useStaticQuery, navigate } from 'gatsby';
import {
    ImageFit, DocumentCard, DocumentCardImage, DocumentCardDetails, DocumentCardTitle, DocumentCardActivity
} from '@fluentui/react';
const Article = ({post}) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                  author {
                    name
                  }
                }
            }
        }
    `)
    const onHerfClicked = () => {
        let link
        if (post.frontmatter.permalink) {
            link = post.frontmatter.permalink
        } else {
            link = post.id
        }
        navigate('/' + post.frontmatter.year + '/' + post.frontmatter.month + '/' + post.frontmatter.day + "/" + link)
    }
    const cardStyles = {
        root: { display: 'inline-block', marginRight: 20, minWidth: 280, maxWidth: 380 },
    };
    const cardTitleStyles = {
        root: {
            fontSize: 26,
            height: 'auto',
            lineHeight: 'auto',
            display: 'inline-block'
        }
    }
    const cardExcerptStyles = {
        root: {
            color: '#666666',
            fontSize: 15,
            height: 'auto',
            lineHeight: 'auto'
        }
    }
    let thumbnailSize = 220
    let thumbnail
    if (post.frontmatter.thumbnail) {
        thumbnail = post.frontmatter.thumbnail
    } else {
        thumbnail = "/images/default.png"
        thumbnailSize = 24
    }
    return (
        <DocumentCard
            styles={cardStyles}
            onClick={onHerfClicked}
        >
            <DocumentCardTitle title={post.frontmatter.title} styles={cardTitleStyles} />
            <DocumentCardImage height={thumbnailSize} imageFit={ImageFit.cover} imageSrc={thumbnail} />
            <DocumentCardDetails>
                <DocumentCardTitle className="ly-main-left-align ly-gradient-text" title={post.excerpt} styles={cardExcerptStyles} />
            </DocumentCardDetails>
            <DocumentCardActivity 
              people={[{ name: data.site.siteMetadata.author.name, profileImageSrc: '/images/head.png' }]}
              activity={post.frontmatter.date}
            />
        </DocumentCard>
    )
}
export default Article