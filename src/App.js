import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import {  useState } from 'react';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Orders from './Components/Orders';
import Payment from './Components/Payment';

function App() {
  let [cart,setCart]=useState([]);

  let [amount,setAmount]=useState("none");
  console.log(cart,amount)
  return (
    <div className="App container-fluid">

      <Routes>
        <Route exact path="/"
        element={<Dashboard
        cart={cart}
        setCart={setCart}
        setAmount={setAmount}
        />}
        />
        <Route path="/login"
         element={<Login/>}
        />
        <Route path="/signup"
         element={<SignUp/>}
        />
        <Route path="/orders"
         element={<Orders
          cart={cart}
          setCart={setCart}
          setAmount={setAmount}
         />}
        />
        <Route path="/payment"
         element={<Payment
          cart={cart}
          setCart={setCart}
          amount={amount}
         />}
        />
      </Routes>
      
    </div>
  );
}

export default App;
