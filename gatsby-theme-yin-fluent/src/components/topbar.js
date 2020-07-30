import React from "react"
import {
  navigate, useStaticQuery, graphql
} from "gatsby"
import {
  Text,
  FontWeights,
  ActionButton,
  IconButton,
  Stack
} from 'office-ui-fabric-react';

const TopBar = ({
  title
}) => {
  const extralink = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                  extralink {
                    name
                    url
                  }
                }
              }
            categoriesGroup: allMarkdownRemark(limit: 2000, filter: {frontmatter: {isPage: {eq: false}}}) {
                group(field: frontmatter___categories) {
                  fieldValue
                }
            }
        }
    `)
  const siteTextStyles = {
    root: {
      color: '#025F52',
      fontWeight: FontWeights.semibold,
    },
  };
  const clickBackHome = () => {
    navigate('/')
  }
  const extra = extralink.site.siteMetadata.extralink.map (({name ,icon, url}) => {
    let iconProps
    if (icon) { 
      iconProps = { iconName: icon }
    }
    return {
      key: name,
      text: name,
      iconProps: iconProps,
      onClick: ()=> { navigate(url) }
    }
  })
  const groupList = extralink.categoriesGroup.group.map((group) => {
    return { 
      key: group.fieldValue,
      text: group.fieldValue,
      iconProps: {
        iconName: 'CaretHollow'
      },
      onClick: ()=> { navigate(`/categories/${group.fieldValue}`) }
    }
  })
  const menuProps = {
    items: [
    {
      key: '主页',
      text: '主页',
      iconProps: {
        iconName: 'Home'
      },
      onClick: ()=> { navigate('/') }
    },
    {
        key: '标签',
        text: '标签',
        iconProps: {
          iconName: 'Tag'
        },
        onClick: ()=> { navigate('/tags/') }
    }
    ].concat(extra),
    directionalHintFixed: true,
  };
  const menuCategroyProps = {
    items: groupList
  }
  return ( <>
    <div className = "ly-fixed-top ly-sm ly-topbar-container" >
    <div className = "ly-topbar-left" >
    <Stack tokens={{ childrenGap: 8 }} horizontal>
    <IconButton menuProps = {
      menuProps
    }
    iconProps = {
      {
        iconName: 'BulletedList'
      }
    }
    persistMenu={true}
    title = "导航"
    ariaLabel = "导航"
    className="ly-topbar-top-m ly-display-block-force"
    />
    <IconButton menuProps = {
      menuCategroyProps
    }
    iconProps = {
      {
        iconName: 'ThumbnailView'
      }
    }
    persistMenu={true}
    title = "导航"
    ariaLabel = "导航"
    className="ly-topbar-top-m ly-display-block-force"
    />
    </Stack>
    </div> 
    <div className = "ly-topbar-center">
    <ActionButton onClick = {
      clickBackHome
    } 
    >
    <Text variant = {
      "large"
    }
    styles = {
      siteTextStyles
    } > {
      title
    } </Text> 
    </ActionButton> 
    </div> 
    <div className="ly-topbar-clear"></div>
    </div> 
    </>
  )
}

export default TopBar