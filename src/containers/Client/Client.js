import React, { Component } from "react";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import ListIcon from "@material-ui/icons/List";

import Lock from "@material-ui/icons/Lock";
import { Redirect, Router, Route } from "react-router-dom";
import Hist from '../../index';
import ReactDOM from 'react-dom';

import Products from '../../components/Products/Products';

import Login from '../Login/Login';


const drawerWidth = 240;
const styles = {
  root: {
    display: "grid"
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "purple"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: "auto",
    color: "purple"
  },
  content: {
    flexGrow: 1,
    padding: '20px'
  }
};
const classes = styles;
let data;

class User extends Component {

  state = {
    component: '',
    products: ''
  }

componentDidMount(){
  alert('Welcome to your Profile');
}

  // handleChange = text => {
  //   let pathurl = "/" + text;
  //   let path = <Redirect to={"/User/Products/" + this.props.match.params.username} />;
  //   data = text;
  //   if (text === "Products")
  //     path = <Redirect to={"/User/Products/" + this.props.match.params.username} />;


  //   this.setState({ component: text });
  //  // alert(this.props.match.params.username)

  //   return (
  //     ReactDOM.render(

  //       <Router history={Hist}>
  //         <Route path="/User/Products/:username" component={Products} />
         


  //         {path}
  //       </Router>,
  //       document.getElementById("root")
  //     )
  //   );
  // };
  render() {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            

            <Button style={{ padding: "0 0 0 70%" }} color="inherit" onClick={() => {
              const path = <Redirect to="/Login" />;
              return (
                ReactDOM.render(
                  <Router history={Hist}>
                    <Route path="/Login" component={Login} />
                    {path}
                  </Router>,
                  document.getElementById("root")
                )
              );

            }}>
              <Lock />  Logout
          </Button>
          </Toolbar>
        </AppBar>
     
        <main className={classes.content}>
          <Toolbar />


        <Router history={Hist}>
          <Route path="/User/Products/:username" component={Products} />
         


          <Redirect to={"/User/Products/" + this.props.match.params.username} />
        </Router>
      
    
        </main>
      </div>
    );
  }
}
export default User;
