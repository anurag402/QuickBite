import React, { useState } from 'react'
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from "react-router-dom"
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './Reducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">QuickBite</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse me-auto" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                :
                ""
              }
            </ul>
            {!(localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
              </div>
              :
              <div className='d-flex'>
                <div className="btn bg-white text-success mx-1" onClick={() => setCartView(true)}>
                  My Cart {" "}
                  {data.length > 0 ? <Badge pill bg='danger'>{data.length} </Badge>: ""}
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /> </Modal> : ""}
                <div className="btn bg-danger text-white mx-1" onClick={logoutHandler}>Log out</div>
              </div>
              
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

