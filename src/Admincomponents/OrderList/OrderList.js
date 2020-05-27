import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import axios from 'axios';
import Order from './Order';

class EnhancedTable extends Component {


constructor(props){
    super(props);
    this.state={
          status:'',
          total:'',
          orders:[],
          ord:[],
          id:'',
          quantity:'',
          image:'',
          email:'',
          open:false,
          keys:[],
    };
    this.handleOpen=this.handleOpen.bind(this);
}

componentDidMount(){
    let url="https://auth-6c8e5.firebaseio.com/Ords.json";
    axios.get(url).then(response => {
      const ord=[];
      const k=[];
      for(let key in response.data){
        ord.push({
            orders:response.data[key].orders,
            status:response.data[key].status,
            userName:response.data[key].customer.name,
            userEmail:response.data[key].customer.email,
            userPhone:response.data[key].customer.phone,
            userAddress:response.data[key].customer.address.country,
            key:key
        })
         k.push({key,id:response.data[key].id});

      }
      console.log(ord)
      console.log(k);
      this.setState({orders:ord.map(item=>{
            return(
              <Order
              keys={k}
              key={item.key}
              orders={item.orders}
              id={item.key}
              status={item.status}
              userEmail={item.userEmail}
              userAddress={item.userAddress}
              userPhone={item.userPhone}
              userName={item.userName}
              />
              )
      })});
      this.setState({keys:k});
    }).catch(err=>console.log(err));
}

handleClose(){
    this.setState({open:false});
  }

handleOpen = () => {
    this.setState({open:true});
}


render() {


return (

<div>  
    <Paper className="container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Name</TableCell>
            <TableCell >Shape</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>User Phone</TableCell>
            <TableCell>User Address</TableCell>
            <TableCell>Reject Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
             <React.Fragment>
                   {this.state.orders ? this.state.orders : <p>Loading</p>}
             </React.Fragment>
        </TableBody>
      </Table>
    </Paper>
</div>

 );
    }
}

export default EnhancedTable;