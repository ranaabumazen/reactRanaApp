import React, { Component } from 'react';
import './App.css';
import { Route, withRouter,Switch,Redirect} from "react-router-dom";
import Login from './containers/Login/Login';




class App extends Component {
  
  render(){


    let routes = (
      <Switch>
           <Route path="/Login" component={Login} />   
           <Redirect from="/" to="/Login" />
      </Switch>
    );
  
    return (
         <React.Fragment>
            {routes}
         </React.Fragment>  
    );
  
  }
}

export default withRouter(App);

