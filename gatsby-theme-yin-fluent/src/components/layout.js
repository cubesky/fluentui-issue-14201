import React from "react"
import { Helmet } from "react-helmet"
import { Fabric, Text, DefaultButton, PrimaryButton, Separator, Stack } from 'office-ui-fabric-react'
import { graphql, useStaticQuery, navigate } from 'gatsby';
import Sidebar from './sidebar'
import Article from './article'
import Post from './post'
import Tag from './tag'
import SEO from './seo'
import TopBar from './topbar'
import SmIdentity from './identity-sm'
import Transition from './transition'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

const Layout = ({ title, children, layout, location }) => {
  const siteData = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        title
        author {
          name
        }
        description
      }
    }
  }
`)

    let Posts
    let postTitle
    let metaPost = []
    let smIdshown = true
    let keyword = [siteData.site.siteMetadata.title, siteData.site.siteMetadata.author.name]
    if (layout === 'index') {
      Posts = children
        .map(edge => <Article key={edge.node.id} post={edge.node} />)
      postTitle = title
      smIdshown = true
    } else if (layout === 'post') {
      Posts = <Post key={children.id} children={children}/>
      postTitle = title
      metaPost = [{"property": "og:type", "content": "article"}]
      smIdshown = false
      if (children.post.frontmatter.tags != null) keyword = keyword.concat(children.post.frontmatter.tags)
    } else if (layout === 'category') {
      const tmp = children
      .map(edge => <Article key={edge.node.id} post={edge.node} />)
      Posts = (<>
      <div className="ly-a-p-2"><Text variant={'xxLarge'} block>分类</Text></div>
      {tmp}
      </>)
      smIdshown = true
      postTitle = title
    } else if (layout === 'tag') {
      const tmp = children
        .map(edge => <Article key={edge.node.id} post={edge.node} />)
      Posts = (<>
          <div className="ly-a-p-2"><Text variant={'xxLarge'} block>{title}</Text></div>
          {tmp}
          </>)
      postTitle = title
      smIdshown = true
    } else if (layout === 'tags') {
      const tmp  = children
        .map(tags => <Tag key={`tag-${tags}`} tag={tags} />)
      Posts = (<>
        <div className="ly-a-p-2"><Text variant={'xxLarge'} block>标签</Text></div>
        {tmp}
        </>)
      postTitle = title
      smIdshown = true
    } else if (layout === '404') {
      const returnIndex = () => {
        navigate('/')
      }
      const returnBack = () => {
        window.history.back()
      }
      smIdshown = true
      Posts = (
      <div className="ly-flex ly-height-100 ly-full-center">
        <div className="ly-card ly-b-m-2 ly-fit-width">
          <center><Text variant={'xxLarge'} block>404 NOT FOUND</Text></center>
          <Separator className="ly-bg-all-transparent"/>
          <Text>看起来你来到了天空的边界？</Text>
          <Text>这里不太适合你，快回去吧！</Text>
          <Separator className="ly-bg-all-transparent"/>
            <Stack horizontal tokens={{childrenGap: 8}} className="ly-justify-content">
            <div className="ly-a-p-1"><DefaultButton text="返回上一页" onClick={returnBack}/></div>
            <div className="ly-a-p-1"><PrimaryButton text="回到主页" onClick={returnIndex}/></div>
            </Stack>
        </div>
      </div>
      )
      postTitle = title
    }
    let isShownSMid = ""
    if (!smIdshown) {
      isShownSMid = "ly-display-none"
    }
    return (
      <>
      <TopBar title={siteData.site.siteMetadata.title}/>
      <Fabric
        className="ly-fabric"
        key={"mainFabric"}
      >
        <GatsbySeo
              title={postTitle}
              description={siteData.site.siteMetadata.description.replace('\n', '')}
              canonical={siteData.site.siteMetadata.siteUrl + location.pathname}
              openGraph={{
                url: siteData.site.siteMetadata.siteUrl,
                title: postTitle,
                description: siteData.site.siteMetadata.description.replace('\n', ''),
                images: [
                  { url: '/icons/icon-512x512.png' },
                ],
                site_name: siteData.site.siteMetadata.title,
              }}
        />
        <Helmet title={postTitle} defer={false}
        htmlAttributes={{ lang : 'cn' }}
        meta={[
          {"property": "description", "content": siteData.site.siteMetadata.description.replace('\n', '')},
          {"property": "image", "content": "/images/logo.png"},
          {"property": "og:description", "content": siteData.site.siteMetadata.description.replace('\n', '')},
          {"property": "og:image", "content": "/images/logo.png"},
          {"property": "og:title", "content": postTitle},
          {"property": "og:url", "content": siteData.site.siteMetadata.siteUrl + location.pathname},
          {"property": "twitter:title", "content": postTitle},
          {"property": "twitter:card", "content": "summary_large_image"},
          {"property": "twitter:description", "content": siteData.site.siteMetadata.description.replace('\n', '')},
          {"property": "twitter:image", "content": "/images/logo.png"},
        ].concat(metaPost)} 
        script={[{ 
          type: 'application/ld+json', 
          innerHTML: `
          {
            "@context": "https://schema.org",
            "@type": "Website",
            "description": "${siteData.site.siteMetadata.description.replace('\n',' ')}",
            "url": "${siteData.site.siteMetadata.siteUrl}",
            "name": "${siteData.site.siteMetadata.title}",
            "publisher": {
              "@type": "Person",
              "name": "${siteData.site.siteMetadata.author.name}"
            },
            "image": {
              "@type": "ImageObject",
              "url": "/myfiles/images/favicon.png"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${siteData.site.siteMetadata.siteUrl}"
            },
            "keywords": "${keyword.join(',')}"
          }
          ` 
        }]}>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"></meta>
          <SEO title={postTitle} article={layout==="post"}/>
        </Helmet>
        <div className="ly-container">
          <Sidebar key="sideBar"/>
          <div className="ly-center">
            <Transition location={location}>
              <div className="ly-main">
                <div className={`ly-sm ${isShownSMid}`}>
                <SmIdentity/>
                <Separator className="ly-bg-all-transparent"/>
                </div>
                {Posts}
              </div>
            </Transition>
          </div>
        </div>
      </Fabric>
      </>
    );
  }

  export default Layout