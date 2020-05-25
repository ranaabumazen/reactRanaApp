import React, { Component } from "react";
import classes from "./Product.module.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Modal from '@material-ui/core/Modal';
import axios from "../../../instanceaxios";


class Product extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedProduct: {},
      quickViewProduct: {},
      isAdded: false,
      cart: [],
      totalItems: 0,
      totalAmount: 0,

      cartBounce: false,
      quantity: 1,
      open: false
    };
    this.addToCart = this.addToCart.bind(this);


  }


  addToCart(userEmail, image, name, price, id, quantity, description, category) {
    this.setState(
      {
        selectedProduct: {
          userEmail: userEmail,
          image: image,
          name: name,
          price: price,
          id: id,
          quantity: quantity,
          description: description,
          category: category
        }
      },
      function () {
        this.handleAddToCart(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAdded: true
      },
      function () {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );


  }
  handleAddToCart(selectedProducts) {

    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {

      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    console.log(this.state.quantity);
    setTimeout(
      function () {
        this.setState({
          cartBounce: false,
          quantity: 1
        });

      }.bind(this),
      1000
    );

    axios.post('/cart.json',
      selectedProducts);


    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);



  }


  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function (item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }


  handleChange() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let id = this.props.id;
    let quantity = this.props.productQuantity;
    let description = this.props.description;
    let category = this.props.category;

    const body = (
      <div style={{
        alignItems: 'center',
        top: '10%',
        backgroundColor: 'white',
        bottom: '10%'
      }}>
        <p className={classes.productimage}>
          <img
            src={image}
            alt={name}

          />
        </p>
        <h1
          className={classes.productname}>
          <span style={{ fontSize: '5' }}>
            Product's Name:
              </span>
          {name}
        </h1>

        <p className={classes.productprice}>

          {price}
        </p>
        <p className={classes.productname}>

          {description}
        </p>
      </div>
    )
    return (
      <React.Fragment>
        <Card className={classes.product}>
          <CardActionArea >
            <CardMedia onClick={this.handleChange.bind(this)}
              className={classes.productimage}>
              <img
                src={image}
                alt={name}

              />
            </CardMedia>


            <CardContent>
              <Typography gutterBottom variant="h5" component="h2"
                className={classes.productname}>
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p"
                className={classes.productprice}>
                {price}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2"
                className={classes.productname} >
                {category}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>

            <Button size="small" color="primary"
              onClick={this.addToCart.bind(
                this,
                this.props.useremail,
                image,
                name,
                price,
                id,
                quantity,
                description,
                category
              )}
              className={classes.button}>
              {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
            </Button>
          </CardActions>

        </Card>
        <Modal style={{
          width: '650px',
          height: '220px',


          paddingLeft: '30%',

        }}
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"

        >
          {body}

        </Modal>
        <div style={{ display: 'none' }}>
          {/* <Cart  products = {this.state} /> */}
        </div>
      </React.Fragment>

    );
  }
}

export default Product;