import React, { Component } from 'react';
import Product from './Product/Product';

import classes from './Products.module.css';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Modal from '@material-ui/core/Modal';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from '../../instanceaxios';
import Button from '@material-ui/core/Button';
import ContactData from '../../containers/ContactData/ContactData';
import { Router, Route, Switch,Redirect} from "react-router-dom";
import ReactDOM from 'react-dom';

import Hist from '../../index';
let orderss=[];
class Products extends Component {
  constructor() {
    super();
    this.viewOrderHandler = this.viewOrderHandler.bind(this);
    this.deleteOrderfromcartHandler = this.deleteOrderfromcartHandler.bind(this);
    this.deleteFun = this.deleteOrderfromcartHandler.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.continueHandleOrder = this.continueHandleOrder.bind(this);
  }
 

  state = {
    products: [],
    cart: [],
    totalItems: 0,
    totalAmount: 0,

    cartBounce: false,
    quantity: 1,
    loading: false,
    open: false,
    order: [],
    key: '',
    username:''
  }

  componentDidMount() {
    let url = "https://chireactproject.firebaseio.com/Products.json/";
   
    axios.get(url).then(response => {
      this.setState({username:this.props.match.params.username});
      const pro=[];
      for(let key in response.data){
        pro.push({
            id:response.data[key].id,
            name:response.data[key].name,
            price:response.data[key].price,
            image:response.data[key].image,
            description:response.data[key].description,
            category:response.data[key].category
        })
      }
      this.setState({products:pro.map(product=>{
          return(
            <Product 
            key={product.id}
            price={product.price}
            image={product.image}
            id={product.id}
            name={product.name}
            description={product.description}
            category={product.category}
            useremail={this.props.match.params.username}
            />
        )
      })})
      
}        ).catch(err=>console.log(err));
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.order;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.order;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }


  viewOrderHandler() {
    const orders = [];
    axios.get('/cart.json').then(response => {

      for (let key in response.data) {
        if (response.data[key].userEmail === this.props.match.params.username)
       {   
         console.log(response.data[key].userEmail)
         orders.push({
          image: response.data[key].image,
          name: response.data[key].name,
          price: response.data[key].price,
          quantity: this.state.quantity,
          id: key,
          description:response.data[key].description,
          category:response.data[key].category
        })
      }
    }
     orderss ={
      order:orders
    }

      this.setState({ order: orders });
      this.sumTotalItems();
      this.sumTotalAmount();




    });
    this.setState({ open: true });
  }

  deleteOrderfromcartHandler(key) {
    console.log(key)

    this.setState({ key: key });
    const orders = [];

    axios.delete(`https://auth-6c8e5.firebaseio.com/cart/${key}.json`)
      .then(response => {
        console.log(response.data);
        axios.get('/cart.json').then(response => {

          for (let key in response.data) {
            if (response.data[key].userEmail === this.props.match.params.username)
            {  console.log(response.data[key].userEmail)
            orders.push({
              image: response.data[key].image,
              name: response.data[key].name,
              price: response.data[key].price,
              id: key,
              description:response.data[key].description,
              category:response.data[key].category
            })
          }
        }
          this.setState({ order: orders });
         
          this.sumTotalItems();
          this.sumTotalAmount();
          
          
          
        })
      })



    console.log(this.state.order)

  }

  handleChange() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  continueHandleOrder() {
    //  const queryParams =[];
    //    for(let i in this.state.order){
    //        queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.order[i]));
    //    }
    //    queryParams.push('price='+this.state.totalAmount);
    //    const queryString= queryParams.join('&');
       
    //   this.props.history.push({
    //      pathname:  '/contactData',
    //      search:'?'+queryString
    //     }
    //        )

      const routes = (
            <Switch>
<Route 
//path={this.props.match.path + '/contactData'} 
render={(props) =>
 (<ContactData 
  orderss={orderss.order}
  orders={this.state.order} 
 price={this.state.totalAmount}
 username={this.state.username}
 {...props} />)} />
    <Redirect to={this.props.match.path + '/contactData/:'} />
           </Switch>
         );
return(
ReactDOM.render(
         <Router history={Hist}>
             {routes}
         </Router>,
         document.getElementById("root")
)
);
  }
  
 


  render() {
    let products = []
    if (this.state.products) {
      products = this.state.products
    }
    const body = (
      <React.Fragment>
        <HighlightOffIcon onClick={this.handleClose.bind(this)} />
        {this.state.order && this.state.totalAmount >=0  ?
          (this.state.order.map(order => (
            <Card style={{
              background: 'white',
              margin: '8px',
              width: '100%',
              borderRadius: '2px',
              height: '45%',
              alignItems: 'center',
              marginBottom: '10px'

            }}>
              <CardActionArea >
                <CardMedia
                  style={{ height: '80px', alignItems: 'center', alignSelf: 'center' }}>
                  <img
                    style={{ height: '100%' }}
                    src={order.image}
                    alt={order.name}

                  />
                </CardMedia>


                <CardContent>
                  <Typography gutterBottom variant="h7" component="h2"
                    className={classes.productname}>
                    {order.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p"
                    className={classes.productprice}>
                    {order.price}
                  </Typography>
                  <Typography>
                    <RemoveCircleIcon onClick={this.deleteOrderfromcartHandler.bind(this, order.id)} />
                  </Typography>

                </CardContent>

                <br />
                <br />

              </CardActionArea>

            </Card>
          )))
          : <p style={{ color: 'black', textAlign: 'center', fontSize: '36px' }}>Reopen the cart please because of loading...</p>}
        <Card>
          <CardContent>
            <Typography style={{ backgroundColor: 'white', textAlign: 'center', fontSize: '16px' }}>
              Total Items:{this.state.totalItems}
            </Typography>
            <Typography style={{ backgroundColor: 'white', textAlign: 'center', fontSize: '16px' }}>
              Total Price:{this.state.totalAmount}
            </Typography>
          </CardContent>


          <CardActions>

            <Button size="small" color="primary"

              className={classes.productbutton}
              onClick={this.continueHandleOrder}
            >
              Submit Order
       </Button>
          </CardActions>
        </Card>

      </React.Fragment>
    )



    return <div
      className={classes.productswrapper}
    >

      <div style={{ paddingLeft: '70%' }}>
        <ShoppingCartIcon onClick={this.viewOrderHandler.bind(this)} style={{ color: 'green', fontSize: '60' }}
        />
      </div>
      <br />
      <div

        className={classes.products}
      >

        <React.Fragment>
          {this.state.products ? products : <p>Loading</p>}
        </React.Fragment>
        
           
      </div>
      <Modal

        style={{
          //   width:'650px',
          // height:'220px',
          // overflow:'scroll',


          // paddingLeft:'30%',
          // position:'absolute',
          width: '40%',
          top: '5%',
          left: '30%',
          overflowY: 'scroll',
          height: '90%',
          // display:'block',
          backgroundColor: 'white',
          display: 'block',
          alignItems: 'center',
          justifyContent: 'center',
          //bottom:'10%'

        }}
        open={this.state.open}
        // onClose={this.handleClose.bind(this)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"

      >
        {body}

      </Modal>
    </div>
  }
}

export default Products;
