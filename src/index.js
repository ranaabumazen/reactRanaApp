import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,  combineReducers } from 'redux';
import { createBrowserHistory } from "history";
import './index.css';
import App from './App';
//import Auth from './Login/Auth';
//import authReducer from './store/reducers/auth';

//const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
 const hist = createBrowserHistory();
// const rootReducer = combineReducers({
//   auth:authReducer
// });
// const store  = createStore(rootReducer);
const app = (
  // <Provider store={}>
  //   <BrowserRouter history={}>
  //   <App />
  //   </BrowserRouter>
  // </Provider>
  
    <BrowserRouter history={hist}>
    <App />
    </BrowserRouter>
)


ReactDOM.render(app,document.getElementById('root'));

export default hist;