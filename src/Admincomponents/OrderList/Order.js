import React ,{Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from "@material-ui/core/TableRow";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Hist from '../../index';


class Order extends Component{
    state={
        orders:[]
    }
   
    componentDidMount(){
        this.setState({orders:this.props.orders});
        console.log(this.props.orders)
    }
    
    
    render(){
      

        return(
           
       
            this.state.orders.map((item,index)=>(
        
       
        
                <TableRow key={index} >
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
                  <TableCell >{item.category}</TableCell>
                  <TableCell>{this.props.userName}</TableCell>
                  <TableCell >{this.props.userEmail}</TableCell>
                  <TableCell >{this.props.userPhone}</TableCell>
                  <TableCell >{this.props.userAddress}</TableCell>
                 
                    
    
                  <TableCell>
                            <Button  
                                variant="contained" 
                                color="primary" 
                                type="submit"  
                                onClick={(event)=>{
                                    event.preventDefault();
                                    var arr = [];
                                    var arr1=[];
                                    var x=[];
                                    arr=this.props.orders;
                                    var y=this.props.keys;
                                    console.log(y)
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
                                    console.log(x);
                                    console.log(item.id);
                                    console.log(this.props.id)
                                    let inorders=[];
                                    let orderss=[];
                                    axios.get(`https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}/orders.json`).then(res=>{
                                        let k;
                                        let i=0;
                                        for( k in res.data)
                                        {
                                            if(res.data[k].id === item.id){
                                               let url = `https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}/orders/${k}.json`;
                                                axios.delete(url).then(response=>{
                                                    console.log(response)  
                                                })
                                           }
                                           else {
                                            inorders.push({
                                                image: res.data[k].image,
                                                name: res.data[k].name,
                                                price: res.data[k].price,
                                                category:res.data[k].category,
                                                id:res.data[k].id,
                                                quantity:res.data[k].quantity,
                                                description:res.data[k].description
                                              })
                                              i++;
                                           }

                                        }
                                
                                    let aorders={}
                                    if(i>0)
                                    { 
                                           aorders= {
                                           orders:inorders,
                                           customer:{
                                           name: this.props.userName,
                                           address: {
                                              country: this.props.userAddress
                                           },
                                           email: this.props.userEmail,
                                           phone: this.props.userPhone
                                         }};
                                    }  

                                    axios.delete(`https://auth-6c8e5.firebaseio.com/Ords/${this.props.id}.json`).then(response=>{ 
                                            console.log(response)   
                                    })
                                        
                                    if(i===0);
                                    else axios.post(`https://auth-6c8e5.firebaseio.com/Ords.json`,aorders).then(response =>{
                                        axios.get(`https://auth-6c8e5.firebaseio.com/Ords.json`).then(response => {
                    
                                                 for (let k in response.data)
                                                { 
                                                  orderss.push(
                                                   ...response.data[k].orders                
                                                          )
                                                }
                         
                                                const neworders={orders:orderss}
                                                console.log(neworders);
                                                console.log(orderss);
                                                alert(orderss);
                                                this.setState({ orders:orderss });
                                        })
                                                      
            
                                    })
                
                                         })
                                              
                                    Hist.goBack();
                                               
                        
                                    }//onClick
                             }

                            >
                             
                                Reject 
                        </Button>
     
                  </TableCell>
                  

    
                </TableRow>
            ))
              
        );
    }
}
export default Order;