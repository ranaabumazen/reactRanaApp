import React, { Component } from 'react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from "@material-ui/core/Grid";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import classes from '../../components/Products/Products.module.css';
import Button from '@material-ui/core/Button';
import User from '../Client/Client';
import { Redirect, Router, Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';

import Hist from '../../index';
import axios from '../../instanceaxios';

class ContactData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: '',

                name: '',
                phone: '',
                country: ''
            },
            submitted: false,
            //redirectPath:'/Login',
            orders: [],
            price: '',
            username: '',
            ord:[]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
        this.orderHandler = this.orderHandler.bind(this);
    }


    emailRef = React.createRef();

    nameRef = React.createRef();
    phoneRef = React.createRef();
    countryRef = React.createRef();



    handleBlur = (event) => {
        this.emailRef.current.validate(event.target.value);

    }
    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }
    orderHandler = (event) => {
        event.preventDefault();
        let ord=[];
          this.props.orders.map(function(order){
              ord.push({
                image:order.image,
                price:order.price,
                quantity:order.quantity,
                name:order.name,
            
                  
              })
            })
          this.setState({ord:this.props.orderss});
        const order = {
            orders:this.props.orderss,
            status:'Pending',
            total: this.props.price,
            customer: {
                name: this.state.formData['name'],
                address: {

                    country: this.state.formData['country']
                },
                email: this.state.formData['email'],
                phone: this.state.formData['phone']
            },

        }
      //  console.log(order.orders)
        console.log(order);
        axios.post('/Ords.json', order)
            .then(response => {
                alert('Your order is submitted');
                const routes = (
                    <Switch>

                        <Redirect to={"/User/" + this.props.username} />;

                    </Switch>
                );
                return (
                    ReactDOM.render(
                        <Router history={Hist}>
                            <Route path="/User/:username" component={User} />
                            {routes}
                        </Router>,
                        document.getElementById("root")
                    )
                );

                //this.props.history.push('/');
            })
            .catch(error => {

            });

    }
    checkoutCancelledHandler() {
        //alert("/User/"+this.props.username);
        const routes = (
            <Switch>

                <Redirect to={"/User/" + this.props.username} />;

            </Switch>
        );
        return (
            ReactDOM.render(
                <Router history={Hist}>
                    <Route path="/User/:username" component={User} />
                    {routes}
                </Router>,
                document.getElementById("root")
            )
        );
    }


    render() {
        const style = {
            height: 450,

            marginBottom: 100,
            width: 400,

            display: 'block'
        };

        const style1 = {
            width: '90%',
            marginLeft: 20,
            marginRight: 20,
            height: 50
        };

        const style2 = {
            fontFamily: "Lucida Console",
            color: 'blue',
            marginRight: 10,
            marginLeft: 10,
            fontWeight: 'bold',
        }







        const { formData, submitted } = this.state;

        return (
            <center>
                <p>Please go down of this page to finish the order  </p>
                {this.props.orders ?
                    (this.props.orders.map(order => (
                        <div
                            style={{
                                paddingTop: '10px',
                                animation: 'slideUp 300ms linear',
                                animationDelay: '150ms',
                                paddingLeft: '10%',
                                paddingRight: '10%',
                                width: '40%',
                                height: '20%'

                            }}
                        >
                            <Card style={{
                                background: 'white',
                                margin: '8px',
                                width: '100%',
                                borderRadius: '2px',
                                height: '39%',
                                alignItems: 'center',
                                marginBottom: '10px'

                            }}>
                                <CardActionArea >
                                    <CardMedia
                                        style={{ height: '100px', alignItems: 'center', alignSelf: 'center' }}>
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


                                    </CardContent>

                                    <br />
                                    <br />

                                </CardActionArea>

                            </Card>
                        </div>
                    )))
                    : <p style={{ color: 'black', textAlign: 'center', fontSize: '36px' }}>Loading...</p>}
                <Card>
                    <CardContent>

                        <Typography style={{ backgroundColor: 'white', textAlign: 'center', fontSize: '16px' }}>
                            Total Price:{this.props.price}
                        </Typography>
                    </CardContent>



                </Card>

                <div style={style} >

                    <br />
                    <p style={style2}>Enter your Contact Data </p>

                    <ValidatorForm
                        ref="form"
                        // onSubmit={this.onRegister}
                        instantValidate={false}
                    >
                        <Grid item>
                            <TextValidator
                                label="Name"
                                name="name"
                                type="name"
                                variant="outlined"
                                onChange={this.handleChange}
                                style={style1}
                                required
                                value={formData.name}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                ref={this.nameRef}

                            />
                        </Grid>

                        <br />
                        <br />

                        <Grid item>
                            <TextValidator
                                ref={this.emailRef}
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                style={style1}
                                required
                                value={formData.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                        </Grid>


                        <br />
                        <br />
                        <Grid item>
                            <TextValidator
                                ref={this.phoneRef}
                                label="Phone"
                                name="phone"
                                type="numeric"
                                variant="outlined"
                                onChange={this.handleChange}

                                style={style1}
                                required
                                value={formData.phone}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <br />
                        <br />
                        <Grid item>
                            <TextValidator
                                label="Country"
                                name="country"
                                type="name"
                                variant="outlined"
                                onChange={this.handleChange}
                                style={style1}
                                required
                                value={formData.country}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                ref={this.countryRef}

                            />
                        </Grid>
                        <br />
                        <br />




                        <Grid item>
                            <Button

                                variant="contained"
                                color="primary"
                                style={style1}
                                type="submit"
                                disabled={submitted}
                                onClick={this.orderHandler}
                            >
                                {
                                    (submitted && 'Sumbited') || (!submitted && ' SUBMIT')
                                }
                            </Button>

                            <br />
                            <br />



                            <Button
                                variant="contained"
                                color="primary"
                                style={style1}
                                onClick={this.checkoutCancelledHandler}

                            >
                                CANCEL
                    </Button>
                        </Grid>
                        <br />
                        <br />

                    </ValidatorForm>
                </div>
            </center>

        );
    }
}
export default ContactData;