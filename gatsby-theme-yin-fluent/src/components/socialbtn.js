import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { IconButton, Stack, ActionButton } from 'office-ui-fabric-react'

const SocialBtn = ({type, align}) => {
    const socials = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            social {
              icon
              title
              url
            }
          }
        }
      }      
    `)
    let alignClass
    if (align === 'center') {
      alignClass = 'ly-text-align-center'
    }
    const socialbtn = socials.site.siteMetadata.social.map((social) => {
        const clicked = () => {
            window.open(social.url)
        }
        if (type === 'icon') {
          return <IconButton key={'social-'+social.title} iconProps={{ iconName: social.icon }} title={social.title} ariaLabel={social.title} onClick={clicked}/>
        } else {
          return <ActionButton key={'social-'+social.title} iconProps={{ iconName: social.icon }} title={social.title} ariaLabel={social.title} onClick={clicked}>{social.title}</ActionButton>
        }
    })
    return (
      <Stack tokens={{ childrenGap: 8 }} horizontal className={alignClass}>
        {socialbtn}
      </Stack>
    )
}

export default SocialBtn