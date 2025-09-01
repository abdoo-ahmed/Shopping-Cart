import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, cart, totalPrice, logout } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-primary text-white" style={{ height: 70 }}>
      <div
        className="container d-flex justify-content-between align-items-center position-relative"
        style={{ paddingLeft: 100, paddingRight: 100 }}
      >
        {/* Logo */}
        <Link to="/" className="brand d-inline">
          <img
            src="/images/14603825_5484736.jpg"
            alt="Logo"
            id="logo-image"
            width={100}
            height={70}
          />
        </Link>

        {/* Welcome user in center */}
        {user && (
          <h3
            id="user"
            className="m-0 position-absolute"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            Welcome {user}
          </h3>
        )}

        {/* Navigation */}
        <nav className="d-flex align-items-center">
          {/* Links if not logged in */}
          {!user && (
            <ul className="list-unstyled d-flex mb-0">
              <li className="me-4">
                <Link to="/login" className="text-white text-decoration-none">
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white text-decoration-none"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}

          {user && (
            <ul className="list-unstyled d-flex mb-0 align-items-center">
              <li
                className="shoppingCart text-decoration-none position-relative"
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fas fa-shopping-cart mr-4 text-white"
                  onClick={() => setOpen((s) => !s)}
                />
                <span
                  className="badge badge-light position-absolute"
                  style={{ top: -6, right: -12 }}
                >
                  {cart.length}
                </span>

                {open && (
                  <div
                    className="cartsProudect bg-primary py-1 rounded text-center position-absolute"
                    style={{ right: 0, width: 300, zIndex: 10 }}
                  >
                    <div className="buyProudect rounded px-4">
                      {cart.length === 0 ? (
                        <div className="p-3 text-white">No items in cart</div>
                      ) : (
                        cart.map((item) => (
                          <div
                            key={item.id}
                            className="row my-2 pr-2 align-items-center text-white"
                          >
                            <span className="col-6">{item.title}</span>
                            <span className="col-2">{item.quantity}</span>
                            <span className="text-danger col-2">-</span>
                            <span className="text-success col-2">+</span>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="total d-flex justify-content-around border-top mb-1 pt-2 mx-2">
                      <h5 className="totalTitle mr-3 text-white">Total</h5>
                      <div className="totalPrice mr-2 text-primary bg-light px-3">
                        {totalPrice}
                      </div>
                    </div>
                    <Link
                      className="ViewPro btn bg-light text-primary mb-1"
                      to="/cart"
                    >
                      View all Products
                    </Link>
                  </div>
                )}
              </li>

              {/* Logout Button */}
              <li className="ms-3">
                <a
                  href="#"
                  id="logOut"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="text-white text-decoration-none"
                >
                  Log Out
                </a>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
