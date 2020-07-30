import * as React from 'react'
import { graphql, useStaticQuery, navigate } from "gatsby"
import {
    ImageFit, DocumentCard, DocumentCardImage, DocumentCardDetails, DocumentCardTitle
} from 'office-ui-fabric-react';
const Friends = () => {
    const friendsQuery = useStaticQuery(graphql`
      query  {
        friends: allFriends {
          nodes {
            avatar
            name
            descr
            link
          }
        }
      }
    `)
    const cardStyles = {
        root: { display: 'inline-block', marginRight: 20, width: 200, maxWidth: 200 },
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
            lineHeight: 'auto',
            display: 'inline-block'
        }
    }
    const friends = friendsQuery.friends.nodes.map((friend) => {
        const onHerfClicked = () => {
            navigate(friend.link)
        }
        let avatar
        if (friend.avatar) {
            avatar = friend.avatar
        } else {
            avatar = "/images/no-avatar.png"
        }
        return (
        <DocumentCard
            styles={cardStyles}
            onClick={onHerfClicked}
        >
            <DocumentCardTitle title={friend.name} styles={cardTitleStyles} />
            <DocumentCardImage height={200} width={200} imageFit={ImageFit.cover} imageSrc={avatar} />
            <DocumentCardDetails>
                <DocumentCardTitle className="ly-main-left-align" title={friend.descr} styles={cardExcerptStyles} />
            </DocumentCardDetails>
        </DocumentCard>)
    })
    return (
    <>
    <div className="ly-text-align-center">
    {friends}
    </div>
    </>
    )
}

export default Friends