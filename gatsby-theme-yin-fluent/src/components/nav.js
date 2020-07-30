import React from "react"
import {
    Nav
} from 'office-ui-fabric-react'
import { navigate,graphql, useStaticQuery } from 'gatsby';

const SideNav = () => {
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
    const groupList = extralink.categoriesGroup.group.map((group) => {
        return { name: group.fieldValue, url: `/categories/${group.fieldValue}`, icon: 'CaretHollow' }
    })
        const navStyles = {
            root: {
                boxSizing: 'border-box',
                overflowY: 'auto',
            },
            chevronIcon: { 
                color: 'transparent',
                transform: 'rotate(0)',
                selectors: {
                  '&:before': { 
                    content: '',
                  },
                  '.is-expanded > * > &:before': { 
                    content: '',
                  }
                }
              }
        }
        const navLinkGroups = [{
            links: [{
                    name: '主页',
                    icon: 'Home',
                    url: '/',
                },
                {
                    name: '分类',
                    expandAriaLabel: '展开分类',
                    collapseAriaLabel: '关闭分类',
                    icon: 'ThumbnailView',
                    links: [ ].concat(groupList),
                },
                {
                    name: '标签',
                    icon: 'Tag',
                    url: '/tags/',
                }
            ].concat(extralink.site.siteMetadata.extralink)
        }]
        return ( <Nav 
            styles = {
                navStyles
            }
            ariaLabel = "Yin Nav"
            groups = {
                navLinkGroups
            } 
            selectedKey = {null}
            onLinkClick = {
                (event, element) =>{
                    if (element.url !== undefined) {
                        event.preventDefault()
                        navigate(element.url)
                    }
                }
            }
            />)
        }
        export default SideNav