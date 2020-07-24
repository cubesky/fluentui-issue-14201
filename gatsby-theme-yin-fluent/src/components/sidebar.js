import React from "react"

import SideNav from './nav'
import Identity from './identity'
import SocialBtn from './socialbtn'
import VRViewBtn from './vrview'
import { Separator } from '@fluentui/react'

export default class Sidebar extends React.Component {
    render() {
        return (
        <>
        <div className="ly-left ly-lg">
              <Identity/>
              <SocialBtn type={`icon`} align={`left`}/>
              <Separator className="ly-bg-all-transparent"/>
              <VRViewBtn/>
              <Separator className="ly-bg-all-transparent"/>
              <SideNav/>
        </div>
        </>
        )
    }
}
