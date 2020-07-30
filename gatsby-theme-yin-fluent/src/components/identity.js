import React from "react"
import {
    Persona, Text, FontWeights, Image, Stack, ActionButton
} from 'office-ui-fabric-react';
import { graphql, StaticQuery, navigate } from "gatsby"

export default class Identity extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    const siteTextStyles = {
        root: {
          color: '#025F52',
          fontWeight: FontWeights.semibold,
          fontSize: 32,
        },
      };
      const descriptionTextStyles = {
        root: {
          color: '#333333',
          fontWeight: FontWeights.semibold,
        },
      };
      const containerStackTokens = { childrenGap: 5, maxWidth: 300 };
      const stackItemStyles = {
        root: {
          padding: 5,
        },
      };
      const imageStyle = { root: { margin: 16, padding: 16, opacity: 1 } }
      const clickBackHome = () => {
        navigate('/')
      }
    return (
    <StaticQuery
      query={graphql`
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
      `}
      render={
        data => (
          <div className="ly-tb-p-1">
                  <Stack tokens={containerStackTokens}>
                      <Stack.Item align="left" styles={stackItemStyles}>
                      <ActionButton onClick={clickBackHome}>
                          <Text variant="small" styles={siteTextStyles}>
                              {data.site.siteMetadata.title}
                          </Text>
                      </ActionButton>
                      </Stack.Item>
                      <Stack.Item align="left" styles={stackItemStyles}>
                          <Image styles={imageStyle} shouldStartVisible={true} src={'/images/logo.png'} width="200px" alt="Placeholder image." />
                      </Stack.Item>
                      <Stack.Item align="left" styles={stackItemStyles}>
                          <Text styles={descriptionTextStyles}><pre>{data.site.siteMetadata.description}</pre></Text>
                      </Stack.Item>
                      <Stack.Item align="left" styles={stackItemStyles}>
                          <Persona 
                                imageUrl={'/images/head.png'}
                                imageInitials='LY'
                                imageShouldStartVisible={true}
                                text={data.site.siteMetadata.author.name}
                                secondaryText={data.site.siteMetadata.author.summary}
                          />
                      </Stack.Item>
                  </Stack>
              </div>
        )
      }
    />
    )
  }
}
