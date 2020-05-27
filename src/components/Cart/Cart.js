import React, { Component } from 'react';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';


import Hist from '../../index';
import axios from '../../instanceaxios';
import Button from '@material-ui/core/Button';
import ContactData from '../../containers/ContactData/ContactData';
import classes from '../Products/Products.module.css';

let orderss = [];

class Cart extends Component {


    constructor() {
        super();
        this._isMounted = false;
        this.deleteOrderfromcartHandler = this.deleteOrderfromcartHandler.bind(this);
        this.deleteFun = this.deleteOrderfromcartHandler.bind(this);
        this.sumTotalItems = this.sumTotalItems.bind(this);
        this.sumTotalAmount = this.sumTotalAmount.bind(this);
        this.continueHandleOrder = this.continueHandleOrder.bind(this);
    }

    state = {
        order: [],
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        quantity: 1,
        isLoading:true

    }
    abortController = new AbortController();


    componentDidMount() {
        this._isMounted = true;
        
        
        const orders = [];
        alert(this.props.username)
        axios.get('/cart.json').then(response => {

            for (let key in response.data) {
                if (response.data[key].userEmail === this.props.username) {
                    // alert(response.data[key].userEmail)
                    orders.push({
                        image: response.data[key].image,
                        name: response.data[key].name,
                        price: response.data[key].price,
                        quantity: this.state.quantity,
                        id: key,
                        description: response.data[key].description,
                        category: response.data[key].category
                    })
                }
            }

            orderss = {
                order: orders
            }

            this.setState({ order: orders });

            this.sumTotalAmount();
            this.sumTotalItems();

            this.setState({isLoading: false})


        });

    }
    componentWillUnmount() {
        this._isMounted = false;
        this.abortController.abort();
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
    deleteOrderfromcartHandler(key) {

        console.log(key)

        this.setState({ key: key });
        const orders = [];

        axios.delete(`https://auth-6c8e5.firebaseio.com/cart/${key}.json`)
            .then(response => {
                console.log(response.data);
                axios.get('/cart.json').then(response => {

                    for (let key in response.data) {
                        if (response.data[key].userEmail === this.props.username) {
                            console.log(response.data[key].userEmail)
                            orders.push({
                                image: response.data[key].image,
                                name: response.data[key].name,
                                price: response.data[key].price,
                                id: key,
                                quantity:this.state.quantity,
                                description: response.data[key].description,
                                category: response.data[key].category
                            })
                        }
                    }
                    this.setState({ order: orders });
                    this.sumTotalAmount();
                    this.sumTotalItems();
                    
                    this.setState({isLoading: false})




                })
                alert('The item is deleted ')
                this.sumTotalAmount();
        }
            )



        console.log(this.state.order)

    }

    continueHandleOrder() {

        const routes = (
            <Switch>
                <Route

                    render={(props) =>
                        (<ContactData
                            orderss={orderss.order}
                            orders={this.state.order}
                            price={this.state.totalAmount}
                            username={this.props.username}
                            {...props} />)} />
                <Redirect to={'/contactData/:'} />
            </Switch>
        );
        return (
            ReactDOM.render(
                <Router history={Hist}>
                    {routes}
                </Router>,
                document.getElementById("root")
            )
        );
    }


    render() {
        return (
            !this.state.isLoading ?
            <React.Fragment>

                {this.state.order && this.state.totalAmount ?
                    (this.state.order.map((order,index) => (
                        <Card 
                        key={index}
                        style={{
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
                                    <Typography gutterBottom variant="h5" component="h2"
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
                    : <p style={{ color: 'black', textAlign: 'center', fontSize: '36px' }}>Loading...</p>}
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

            </React.Fragment> :<p>Loading</p>
        )
    }
}

export default Cart;