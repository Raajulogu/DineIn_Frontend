import React, { useEffect, useState } from "react";
import "./base.css";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";

const Base = ({ cart, setCart, setAmount }) => {
  let [log, setLog] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let navigate = useNavigate();
  //Check token is available when page is loaded
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLog(false);
    } else {
      setLog(true);
    };
  }, []);
  //Handle LogIn
  function handleLogIn() {
    navigate("/login");
  }
  //Handle LogOut
  function handleLogOut() {
    localStorage.removeItem("token");
    setLog(false);
    navigate("/");
    setAnchorElUser(null);
  }
  //Handle Home button
  function handleHome() {
    navigate("/");
    setAnchorElUser(null);
  }
  //Popover properties
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setAnchorElUser(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //Nav Bar
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="base-container row">
      <div className="head-logo col">
        <img
          src="https://cdn.icon-icons.com/icons2/3513/PNG/512/order_food_delivery_app_icon_221045.png"
          onClick={handleHome}
          id="logo"
          alt="logo"
        />
        <h1 className="shop-name" onClick={handleHome}>
          DineIn
        </h1>
      </div>
      <div className="head-button col-2">
        <HomeIcon className="home-btn" onClick={handleHome} />
        <div className="carts">
          <ShoppingCartIcon onClick={handleClick} />
          <p className="cartCount">{cart.length ? cart.length : ""}</p>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {cart.length ? (
            <Cart cart={cart} setCart={setCart} setAmount={setAmount} />
          ) : (
            <Typography sx={{ p: 2 }}>
              Please add atleast one item to cart for view cart items
            </Typography>
          )}
        </Popover>
        <HistoryIcon
          className="history-btn"
          onClick={() => navigate("/orders")}
        />
        <br />
        {!log ? (
          <Button variant="contained" onClick={() => handleLogIn()}>
            LogIn
          </Button>
        ) : (
          <Button variant="contained" onClick={() => handleLogOut()}>
            LogOut
          </Button>
        )}
      </div>
      <Box className="nav" sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar src="/broken-image.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleHome}>
            <Typography textAlign="center">Home</Typography>
          </MenuItem>
          <MenuItem onClick={handleClick}>
            <Typography textAlign="center">Cart</Typography>
          </MenuItem>
          <MenuItem onClick={() => navigate("/orders")}>
            <Typography textAlign="center">Orders</Typography>
          </MenuItem>
          {!log ? (
            <MenuItem onClick={handleLogIn}>
              <Typography textAlign="center">LogIn</Typography>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleLogOut}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </div>
  );
};

const Cart = ({ cart, setCart, setAmount }) => {
  let total = 0;
  let temp = [...cart];
  let navigate = useNavigate();
  //Calculate total amount
  for (var i = 0; i < temp.length; i++) {
    total += temp[i].price;
  }
  //remove item from a cart
  function removecart({ name }) {
    let res = [];
    for (var i = 0; i < temp.length; i++) {
      if (name !== temp[i].name) {
        res.push({
          name: temp[i].name,
          count: temp[i].count,
          price: temp[i].price,
        });
      }
    }
    if (res.length) {
      setCart([...res]);
    } else {
      setCart([]);
    }
  }
  //Add orders to user account
  async function handleCheckout() {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    } else {
      let token = localStorage.getItem("token");

      let order = { foods: [...cart], total: total };

      let res = await fetch(
        `https://dine-in-backend.vercel.app/api/user/foods`,
        {
          method: "PUT",
          body: JSON.stringify({ order }),
          headers: {
            "Content-Type": "application/json",
            "x-auth": token,
          },
        }
      );
      setAmount(total);
      await res.json();
      navigate("/payment");
    }
  }
  return (
    <div className="cart-container">
      {temp.map((foo) => (
        <div className="cart-items" key={foo.price}>
          <p>
            <b>{foo.count}</b> - <b>{foo.name}</b> = <b>{foo.price}</b>
          </p>
          <div className="cart-btns">
            <Button
              onClick={() => removecart({ name: foo.name })}
              variant="contained"
              color="error"
            >
              Remove
            </Button>
          </div>
          <br />
        </div>
      ))}
      <br />
      <span className="cart-total">
        <h4>Total = {total}</h4>
      </span>
      <Button variant="contained" onClick={() => handleCheckout()}>
        Check out
      </Button>
      <br />
      <Typography className="checkout-ctn">
        Click Check out to order your food
      </Typography>
    </div>
  );
};

export default Base;
