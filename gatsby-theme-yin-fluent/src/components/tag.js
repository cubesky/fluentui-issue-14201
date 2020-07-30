import React from "react"
import { navigate } from 'gatsby';
import {
     DocumentCard, DocumentCardTitle
} from 'office-ui-fabric-react';
const Tag = ({tag}) => {
    const onHerfClicked = () => {
        navigate('/tags/' + tag)
    }
    const cardStyles = {
        root: { display: 'inline-block', marginRight: 20, width: 120, maxWidth: 120 },
    };
    const cardTitleStyles = {
        root: {
            fontSize: 26,
            height: 'auto',
            lineHeight: 'auto',
            display: 'inline-block',
            textAlign: 'center'
        }
    }
    return (
        <DocumentCard
            styles={cardStyles}
            onClick={onHerfClicked}
        >
            <DocumentCardTitle title={tag} styles={cardTitleStyles} />
        </DocumentCard>
    )
}
export default Tag