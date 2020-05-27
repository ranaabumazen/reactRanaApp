import React, { Component } from 'react';
import Product from './Product/Product';
import classes from './Products.module.css';

import axios from '../../instanceaxios';


class Products extends Component {

 
constructor(){
  super();
  this._isMounted = false;
}
  state = {
    products: [],
    username:''
  }

  componentDidMount() {
    let url = "https://chireactproject.firebaseio.com/Products.json/";
   
    axios.get(url).then(response => {
      this.setState({username:this.props.username});
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
            useremail={this.props.username}
            />
        )
      })})
      
}        ).catch(err=>console.log(err));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    let products = []
    if (this.state.products) {
      products = this.state.products
    }
   

    return (<div
      className={classes.productswrapper}
    >
 
      <div

        className={classes.products}
      >

        <React.Fragment>
          {this.state.products ? products : <p>Loading...</p>}
        </React.Fragment>
        
           
      </div>
     
    </div>)
  }
}

export default Products;
