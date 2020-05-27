import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Chi from '../../../assests/images/chi1.png';

import Hist from '../../../index';
import {  Route,Router,Redirect} from "react-router-dom";
import Login from '../../../containers/Login/Login';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Person from "@material-ui/icons/Person";
import Products from '../../Products/Products';
import {   Link,Switch} from "react-router-dom";

import Cart from '../../Cart/Cart';
import Profile from '../../Profile/Profile';


import {useRef,useEffect,useState} from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    height:75,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
};



export default function PermanentDrawerLeft(props) {
 
const [isLoading,setLoading] = useState(true);
  const isMounted = useIsMounted();

  useEffect(() => {
    const abortController = new AbortController();
  
    if (isMounted.current) {
      // update your state here
      setLoading(false)
      
    } return function cleanup() {
      abortController.abort();
    };
  }, [isMounted]);

  const classes = useStyles();

  return (
    !isLoading ?
    (<div className={classes.root}>

      <CssBaseline />

      <BrowserRouter>

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          
           <Button 
                color="inherit" 
                onClick={ ()=>{
                    const path = <Redirect  to="/Login" />;
                    return(
                        ReactDOM.render(
                             <Router history={Hist}>
                                 <Route path="/Login" component={Login} />  
                                 {path}
                             </Router>,
                             document.getElementById("root")
                        )
                          );

                      }}>
              <LockIcon />
              <b>LogOut</b>
           </Button>
        </Toolbar>
      </AppBar>


      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        
      >

        <div className={classes.toolbar} >
               <img src={Chi}  style={{marginLeft:60}}  alt='chi'/>
        </div>
         

        <Divider  style={{marginLeft:10,marginRight:10 ,backgroundColor:'blue'}} light />


        <List>
             <ListItem  button key={'Profile'}  component={Link} to={"/User/Profile"}>         
                  <ListItemIcon><Person color="primary" /></ListItemIcon>
                  <ListItemText primary={'Profile'} style={{color:"blue"}}/>
              </ListItem> 
        </List>





        <List>  
            <ListItem button component={Link} to={"/User/Products"}>
              <ListItemIcon><AddShoppingCartIcon color="primary" /></ListItemIcon>
              <ListItemText primary={'Products'} style={{color:"blue"}}/>
            </ListItem>
        </List>

        


         


            

            <List> 
                <ListItem button component={Link} to={"/User/Cart"}>
                      <ListItemIcon><ShoppingCartIcon  color="primary"/></ListItemIcon>
                      <ListItemText primary={'Cart'} style={{color:"blue"}}/>
                </ListItem>
            </List>
            
       
 
      </Drawer>


      <main className={classes.content} style={{backgroundColor:'white' }}> 
        <div className={classes.toolbar} style={{backgroundColor:'white'}}/> 

        <Switch>
        <Route path="/User/Profile" render={()=><div><Profile username={props.username} /></div>}/>
            
         <Route path="/User/Products" render={() => <div><Products username={props.username}/></div>} /> 
           
           
            <Route path="/User/Cart" render={() => <div><Cart username={props.username}/></div>} /> 
        

           
            <Route path="/User/Profile" component={Profile} />
            
            <Redirect  to={"/User/Profile"} />
          </Switch>
      </main>

      </BrowserRouter>
    </div>):<p>Loading</p>
  );
}

