import React, { useEffect, useState } from 'react'
import "./Orders.css";
import Base from '../Base/base';
import { useNavigate } from 'react-router-dom';

const Orders = ({cart,setCart}) => {
  let navigate=useNavigate();
  let [orders,setOrders]=useState([]);
   //Getting data
   useEffect(()=>{
      if(!localStorage.getItem("token")){
          navigate("/login", {replace:true})
      }
      else{
        let token = localStorage.getItem("token")
        let fetchAllData = async()=>{
        let res = await fetch(`https://dine-in-backend.vercel.app/api/user/orders`, {
            method:"GET",
            headers:{
                "x-auth" : token
            }
      });
      let data = await res.json()
      setOrders([...data.foods]);
      }
      fetchAllData()
      }
    },[])
  return (
    <div>
      <Base
      cart={cart}
      setCart={setCart}
      />
        <div className='order-container'>
          <div className='order-box'>
            <h2 className='order-head'><u>Dine In</u></h2>
            <h4>&emsp;<b><u>Your Previous Orders:</u></b></h4>
            {orders.length ? 
            orders.map((foo)=>(
              <div className='orders'>
                <h4><b>Date</b> : {foo.date}</h4>
                <h5>Orders:</h5>
                <div>
                  {foo.foods.map((data)=>(
                    <p>&emsp;&emsp;&emsp;&emsp;
                      <b>{data.count}</b> - <b>{data.name}</b> = <b>{data.price}</b>
                    </p>
                  ))}
                </div>
                <h4><b>Total</b> = {foo.total}</h4>
            </div>
            ))
            :<h2 className='order-nothing'>You didn't ordered anything yet !</h2>}
          </div>
        </div>
    </div>
  )
}

export default Orders