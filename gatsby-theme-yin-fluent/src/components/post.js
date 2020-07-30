import React from "react"
import rehypeReact from "rehype-react"
import { Separator, Text, Persona, PersonaSize, MessageBar, MessageBarType, Stack, Icon } from 'office-ui-fabric-react'
import Disqus from './disqus'
import License from './license'
import BuildTime from '../exported/buildtime'
import BangumiList from '../exported/bangumi-list'
import Firends from '../exported/friends'

const Post = ({children}) => {
    const VerticalSeparatorStack = (props) => (
        <Stack horizontal verticalAlign="center">
          {React.Children.map(props.children, child => {
            return (
              <Stack horizontalAlign="left" tokens={{ childrenGap: 2 }}>
                {child}
              </Stack>
            );
          })}
        </Stack>
      );
      const iconStyles = {
        root: {
          height: '24px',
          width: '24px',
        },
      };
        let license
        if (children.post.frontmatter.license) {
            license = children.post.frontmatter.license
        }
        let outdate
        if (children.post.frontmatter.outdate) {
            outdate = (
            <>
            <MessageBar
                messageBarType={MessageBarType.severeWarning}
            >
                <strong>注意：</strong> 此文章已经过时！请勿作为参考！
            </MessageBar>
            <Separator className="ly-bg-all-transparent"/>
            </>
            )
        }
        let comment
        if (children.post.frontmatter.comment !== false) {
          comment = <Disqus title={children.post.frontmatter.title} location={children.location}/>
        }
        let tags 
        if (children.post.frontmatter.tags) {
          tags = children.post.frontmatter.tags.map((tag) => {
            return (<span className="ly-small-tag">{tag}</span>)
          })
        } else {
          tags = <></>
        }
        let categories
        if (children.post.frontmatter.categories) {
          categories = <span className="ly-small-tag">{children.post.frontmatter.categories}</span>
        } else {
          categories = <></>
        }
        
        const renderAst = new rehypeReact({
            createElement: React.createElement,
            components: { "build-time": BuildTime, 'bangumi-list': BangumiList, 'friends': Firends }
        }).Compiler
        return (
            <>
            <div className="ly-card ly-b-m-2">
                <Text variant={'xxLarge'} block>
                    {children.post.frontmatter.title}
                </Text>
                <Separator className="ly-bg-all-transparent"/>
                <Persona
                    imageUrl={'/images/head.png'}
                    imageInitials='LY'
                    imageShouldStartVisible={true}
                    text={children.author}
                    secondaryText={children.post.frontmatter.date}
                    hidePersonaDetails={false}
                    size={PersonaSize.size40}
                    imageAlt={children.author}
                />
                <Separator className="ly-bg-all-transparent"/>
                <VerticalSeparatorStack>
                <Separator vertical className="ly-bg-all-transparent">
                    <Icon iconName="ThumbnailView" styles={iconStyles} />
                </Separator>
                {categories}
                </VerticalSeparatorStack>
                <VerticalSeparatorStack>
                <Separator vertical className="ly-bg-all-transparent">
                    <Icon iconName="Tag" styles={iconStyles} />
                </Separator>
                {tags}
                </VerticalSeparatorStack>
                <Separator className="ly-bg-all-transparent"/>
                {outdate}
                <div className="ly-content">{renderAst(children.post.htmlAst)}</div>
                <Separator className="ly-bg-all-transparent"/>
                <License pageLicense={license} path={children.location} />
            </div>
            {comment}
            </>
        )
    }
export default Post