import React,{Component} from 'react';


class Profile extends Component{
    render(){
        return(
            <div style={{padding:'20%'}}>
                Welcome to your Profile 
                <p>{this.props.username}</p>
            </div>
        )
    }
}
export default Profile;