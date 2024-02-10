import React, { useState } from 'react'
import Base from '../Base/base'
import foods from '../Data/data.js'
import "./Dashboard.css"
import { Button, TextField } from '@mui/material'
import Payment from './Payment'

const Dashboard = ({cart,setCart,setAmount}) => {
  let [finder,setFinder]=useState("");

  function addcart({name,price,count}){
    let temp=cart.length?[...cart]:[];
    temp.map((val)=>{
      if(val.name===name){
        val.count=count+val.count;
        val.price=val.count*price;
        name=0;
      }
    })
    if(name!==0){
      temp.push({name:name,count:count,price:count*price})
      setCart([...temp])
    }
  }
  return (
    <div>
        
        <div className='main-body'>
          
          <div className='search-container row'>
          <TextField
          className='search-box'
              name='search'
              type='search'
              label="Search"
              value={finder}
              onChange={e=>setFinder(e.target.value)}
            />
          </div>
            {foods &&
            <div class="cards-container row">
            {finder.length<0?
              foods.map((foo,index)=>(
                  <div key={index} className='cards col-md-3' >
                  <div class="card">
                  <img src={foo.img} class="card-img-top" alt="..."/>
                  <div class="card-body">
                    <h5 class="card-title"><h4>{foo.name}</h4></h5>
                    <div className='price'>
                      <input type='Number' className='count' min="1" onChange={(e)=>foo.count = e.target.value}
                      defaultValue='1'
                      />
                      <p class="card-text"><b>Price</b>:{foo.price}</p>
                    </div>
                    <br/>
                    <Button 
                    onClick={()=>addcart({name:foo.name,price:foo.price,count:foo.count})}
                    variant="contained">Add to cart</Button>
                  </div>
                </div>
                  </div>
              )):
              foods.map((foo,index)=>(
                foo.name.toLowerCase().includes(finder.toLocaleLowerCase())?
                (<div key={index} className='cards col-md-3' >
                <div class="card">
                <img src={foo.img} class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title"><h4>{foo.name}</h4></h5>
                  <div className='price'>
                    <input type='Number' className='count' min="1" onChange={(e)=>foo.count = e.target.value}
                    defaultValue='1'
                    />
                    <p class="card-text"><b>Price</b>:{foo.price}</p>
                  </div>
                  <br/>
                  <Button 
                  onClick={()=>addcart({name:foo.name,price:foo.price,count:foo.count})}
                  variant="contained">Add to cart</Button>
                </div>
              </div>
                </div>):""
                
            ))}
        </div>
            }
        </div>
        <Base
        cart={cart}
        setCart={setCart}
        setAmount={setAmount}
        />
    </div>
  )
}



export default Dashboard