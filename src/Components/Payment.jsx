import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Base from "../Base/base";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";

const Payment = ({ cart, setCart, amount }) => {
  //Snackbar
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState("card");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  console.log(cart, amount);

  return (
    <div>
      <Base cart={cart} setCart={setCart} />

      <div className="payment-container">
        <div className="options"></div>
        {type == "card" ? (
          <CardPayment
            handleClick={handleClick}
            amount={amount}
            setType={setType}
          />
        ) : (
          <ScanPay
            handleClick={handleClick}
            amount={amount}
            setType={setType}
            setCart={setCart}
          />
        )}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Payment Done
        </Alert>
      </Snackbar>
    </div>
  );
};

function CardPayment({ amount, handleClick, setType }) {
  let navigate = useNavigate();
  let [number, setNumber] = useState("");
  let [date, setDate] = useState("");
  let [name, setName] = useState("");
  let [code, setCode] = useState("");

  function handlePayment() {
    if (
      number.length > 0 &&
      date.length > 0 &&
      name.length > 0 &&
      code.length > 0
    ) {
      handleClick();
      navigate("/");
    }
  }

  return (
    <div className="payment-box">
      <div className="payment-head">
        <h1>Payment details</h1>
      </div>
      <br />
      <div className="amount-box">
        <h2>Your are paying</h2>
        <h4>
          <CurrencyRupeeIcon />
          {amount}
        </h4>
      </div>
      <br />
      <div className="payment-form">
        <TextField
          className="payment-input"
          required
          id="outlined-required"
          label="Card Number"
          placeholder="**** **** **** ****"
          type="Number"
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <TextField
          className="payment-input"
          required
          id="outlined-required"
          label="Expiry"
          placeholder="Enter Expiry Date"
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <TextField
          className="payment-input"
          required
          id="outlined-required"
          label="Name"
          placeholder="Enter Card holder Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          className="payment-input"
          required
          id="outlined-required"
          label="Security Code"
          placeholder="Enter CVC/CCV"
          onChange={(e) => setCode(e.target.value)}
        />
        <br />
        <div className="btns">
          <Button
            variant="contained"
            size="medium"
            type="submit"
            onClick={() => handlePayment()}
          >
            Confirm Payment
          </Button>
          <Button variant="contained" onClick={() => setType("scan")}>
            Smart Pay
          </Button>
        </div>
      </div>
    </div>
  );
}

function ScanPay({ amount, handleClick, setType,setCart,cart }) {
  let [qrCode, setQrCode] = useState("");
  let [url, setURL] = useState("");
  useEffect(() => {
    const generateQRCode = async () => {
      let data = {
        user: localStorage.getItem("token"),
        price: amount,
        app: "DineIn",
        Product: ["Chicken Biryani", "Fish Biryani", "Plain Dosa"],
      };
      try {
        const response = await axios.post(
          `https://qr-code-generator-backend.vercel.app/api/user/get-qr-code/83cf20f8-9738-4554-8d28-b375f80b2b06`,
          data
        );
        console.log(response);
        let qrCode = await response.data.qrCode;
        let url = response.data.url;
        setQrCode(qrCode);
        setURL(`https://preeminent-hamster-cb26c8.netlify.app/${url}`);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    generateQRCode();
  }, []);

  async function Pay() {
    let prod=[]
    cart.map((val)=>{
      prod.push(val.name);
    })
    let data = {
      user: localStorage.getItem("token"),
      price: amount,
      Product: [...prod],
    };
    try {
      const response = await axios.post(
        `https://qr-code-generator-backend.vercel.app/api/user/update-payment/83cf20f8-9738-4554-8d28-b375f80b2b06`,
        data
      );
      handleClick();
      setCart([])
      alert("Payment Completed Successfully");
    } catch (error) {
      console.error("Error In Fetching Data:", error);
    }
  }
  return (
    <div>
      <div className="qr-code">
        <img src={qrCode} alt="QR Code" />
      </div>
      <div className="payment_btn">
        <Button variant="contained">
          <a className="smart-pay" href={url} target="_blank" onClick={Pay}>
            Pay with SmartPay
          </a>
        </Button>
      </div>
      <br />
      <Button variant="contained" onClick={() => setType("card")}>
        Pay with card
      </Button>
    </div>
  );
}

export default Payment;
