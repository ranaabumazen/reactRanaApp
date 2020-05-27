import React, { Component } from "react";

import PermanentDrawerLeft  from '../../components/UI/Drawer/Drawer';
class User extends Component{
  constructor(){
    super();
    this._isMounted = false;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render(){
    return (<div>
        <PermanentDrawerLeft username={this.props.match.params.username} />
    </div>)
  }
}
export default User;