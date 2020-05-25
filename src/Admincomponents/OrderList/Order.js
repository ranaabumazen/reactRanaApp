import React ,{Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';

class Order extends Component{
    state={
        orders:[]
    }
    componentDidMount(){
        this.setState({orders:this.props.orders});
        console.log(this.props.orders)
    }
    render(){
        let image = this.props.image;
        let name = this.props.name;
        let price = this.props.price;

        return(
           
       
            this.state.orders.map((item)=>(
        
       
        
                <TableRow   >
                  <TableCell component="th" scope="row">
                         {
                           item.name
                         }
                  </TableCell>
                  <TableCell> 
                      <div style={{height:'90px'}}>
                           <img style={{height:'100%'}}
                             src={item.image}
                             alt={item}
                           />
                    </div>
                    </TableCell>
                  <TableCell >{item.price}</TableCell>
                  <TableCell >{this.props.status}</TableCell>
                  <TableCell >{item.category}</TableCell>
                  <TableCell>{this.props.userName}</TableCell>
                  <TableCell >{this.props.userEmail}</TableCell>
                  <TableCell >{this.props.userPhone}</TableCell>
                  <TableCell >{this.props.userAddress}</TableCell>
                  {/* <TableCell >
                     
                         
                       
                      {/* <div  style={{
                                 alignItems:'center',
                                 top:'30%',
                                 backgroundColor:'white',
                                 bottom:'20%',
                                 height:'400px',
                                 }}>
                         <center>
                          <h3 style={{alignContent:'center'}}>        
                             <span style={{fontSize:'5',color:'blue',alignContent:'center'}}>
                                 {/* Clients Email  : {item.email} */}
                             {/* </span>      
                         </h3>
                         <h3>        
                           <span style={{fontSize:'5',color:'blue',alignContent:'center'}}>
                                 {/* Order's quantity : {quantity} */}
                           {/* </span>      
                         </h3>
                         <h3>        
                           <span style={{fontSize:'5',color:'blue',alignContent:'center'}}>
                               
                            </span>
                          </h3>   */}
                         
                         {/* </center>  
                    
                  </TableCell> */}
                            
    
                  <TableCell>
                            <Button  
                                variant="contained" 
                                color="primary" 
                                type="submit"  
                                onClick={()=>{
                                    var arr = [];
                                    var arr1=[];
                                    var x=[];
                                    arr=this.props.orders;
                                    var y=this.props.keys;
                                    console.log(y)
                                    //console.log(y);
                                    for(let i=0;i<arr.length;i++)
                                    {
                                         Object.keys(arr[i]).forEach(function(key) {
                                             arr1.push(arr[i][key]);
                                             });    
                                     } 
                                     for(let a=0;a<6;a++)
                                     {
                                             x.push(arr1[a]);       
                                     }
   
   
                                /*      var array=[];
                                      var array1=[];
                                      for(let i=0;i<y.length;i++)
                                    {
                                         Object.keys(y[i]).forEach(function(k) {
                                           array.push(y[i][k]);
                                             });    
                                     }
                                     for(let a=0;a<2;a++)
                                     {
                                        array1.push( array[a]);       
                                     }
   */
                                    console.log(x);
   
   
                                //   if(x[4]===item.id){
                                             const ordered={
                                                 id:x[4],
                                                 status:'Approved',
                                                 price:x[3],
                                                 image:x[1],
                                                 name:x[2],
                                                 quantity:x[5],
                                              }
                                    //this.setState({ord:ordered})
                                    console.log(item.id);
                                    console.log(this.props.id)
                                    let aorders=[];
                                    let array=[];
                                    axios.get(`https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}/orders.json`).then(res=>{
                                        let k;
                                        for( k in res.data){
                                            if(res.data[k].id === item.id){
                                          
                                               let url = `https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}/orders/${k}.json`;
                                                 
                                                axios.delete(url).then(response=>{
                                                   
                                                    console.log(response)
                                                    
                                                })
                                                
                                            
                                           }
                                           else {
                                            aorders.push({
                                                image: res.data[k].image,
                                                name: res.data[k].name,
                                                price: res.data[k].price,
                                               
                                               
                                              })
                                           }
                                          
                                          // array.push({k});
                                        }
                                        // if(k < 0 ){
                                        //     axios.delete(`https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}.json`);
                                        // }
                                        // axios.delete(`https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}.json`).then(response=>{
                                                   
                                        //     console.log(response)
                                            
                                        // })
                                        
                                        const orders=[];
                                        // axios.get(`https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}/orders.json`).then(response => {
                    
                                        //                     for (let key in response.data) {
                                        //                       {  
                                        //                       orders.push({
                                        //                         image: response.data[key].image,
                                        //                         name: response.data[key].name,
                                        //                         price: response.data[key].price,
                                                               
                                                               
                                        //                       })
                                        //                     }
                                        //                   }
                                        //                    // this.setState({ orders: orders });
                                        //                 }) 
                                                        axios.put(`https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}/orders.json`,aorders);
                                                        axios.get(`https://auth-6c8e5.firebaseio.com/Ords.json`).then(response => {
                    
                                                            for (let key in response.data) {
                                                              {  
                                                              orders.push({
                                                                image: response.data[key].image,
                                                                name: response.data[key].name,
                                                                price: response.data[key].price,
                                                               
                                                               
                                                              })
                                                            }
                                                          }
                                                            this.setState({ orders: orders });
                                                        })
                    
                                    })
                      
                                //    axios.get('https://auth-6c8e5.firebaseio.com/Ords.json')
                                    
                                    console.log(array)
                                   // console.log(orders);
                                   // let url="https://auth-6c8e5.firebaseio.com/Ords/orders"+x[0]+".json";
                              //console.log(url)
                                   
                                    //const idd='5';
                                
                                        
                               
                            
                                   
                                 //   axios.patch(url,ordered).then((response)=>{
                                  //    console.log(response);
                                  //  }).catch(err=>console.log(err));
                               }}
                                    
                              // }
                           
                            >
                                Reject Order
                        </Button>
     
                  </TableCell>
                  

    
                </TableRow>
            ))
              
        );
    }
}
export default Order;