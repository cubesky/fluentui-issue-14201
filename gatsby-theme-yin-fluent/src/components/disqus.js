import React from "react"
import { Text, Separator } from 'office-ui-fabric-react'
import { graphql, useStaticQuery } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

const Disqus = ({location, title}) => {
    const disqusConfig = useStaticQuery(graphql`
      query {
        site {
            siteMetadata {
              disqus {
                shortname
              }
              siteUrl
            }
          }
      }
    `)
    return (
        <>
        <div className="ly-card ly-b-m-2">
            <Text variant={'large'} block>
                评论区
            </Text>
            <Separator className="ly-bg-all-transparent"/>
            <DiscussionEmbed
                shortname={disqusConfig.site.siteMetadata.disqus.shortname}
                config={
                    {
                        url: disqusConfig.site.siteMetadata.siteUrl + location,
                        identifier: disqusConfig.site.siteMetadata.siteUrl + location,
                        title: title,
                        language: 'zh_CN'
                    }
                }
            />
        </div>
        </>
    )
    }

export default Disqus