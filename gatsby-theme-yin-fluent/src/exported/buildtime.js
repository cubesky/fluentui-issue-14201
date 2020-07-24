import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const BuildTime = () => {
    const query = useStaticQuery(graphql`
  {
    siteBuildMetadata {
      buildTime(formatString: "YYYY年MM月DD日")
    }
  }
`)
return (<span><strong>{query.siteBuildMetadata.buildTime}</strong></span>)
}

export default BuildTime