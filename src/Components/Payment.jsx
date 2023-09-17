import React, { useState } from 'react'
import "./Payment.css"
import { Alert, Button, Snackbar, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Base from '../Base/base'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Payment = ({cart,setCart,amount}) => {
    
    let [number,setNumber]=useState("");
    let [date,setDate]=useState("");
    let [name,setName]=useState("");
    let [code,setCode]=useState("");
    let navigate=useNavigate()
    function handlePayment(){
        if(number.length>0&&date.length>0&&
            name.length>0&&code.length>0){
                handleClick()
                navigate("/")
            }
    }

    //Snackbar
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
        <Base
      cart={cart}
      setCart={setCart}
      />
    <div className='payment-container'>
    <div className='payment-box'>
        <div className='payment-head'>
        <h1>Payment details</h1>
        </div>
        <br/>
        <div className='amount-box'>
            <h2>Your are paying</h2>
            <h4><CurrencyRupeeIcon/>{amount}</h4>
        </div>
        <br/>
        <div className='payment-form'
        >
        <TextField
            className='payment-input'
            required
            id="outlined-required"
            label="Card Number"
            placeholder='**** **** **** ****'
            type='Number'
            onChange={(e)=>setNumber(e.target.value)}
        />
        <br/>
        <TextField
            className='payment-input'
            required
            id="outlined-required"
            label="Expiry"
            placeholder='Enter Expiry Date'
            onChange={(e)=>setDate(e.target.value)}
        />
        <br/>
        <TextField
            className='payment-input'
            required
            id="outlined-required"
            label="Name"
            placeholder='Enter Card holder Name'
            onChange={(e)=>setName(e.target.value)}
        />
        <br/>
        <TextField
            className='payment-input'
            required
            id="outlined-required"
            label="Security Code"
            placeholder='Enter CVC/CCV'
            onChange={(e)=>setCode(e.target.value)}
        />
        <br/>
        <Button variant="contained" size="medium" type='submit'
        onClick={()=>handlePayment()}
        >
            Confirm Payment
        </Button>
        </div >
    </div>
    </div>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
</div>
  )
}

export default Payment