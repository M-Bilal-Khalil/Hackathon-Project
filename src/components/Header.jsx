import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="luxe-header">
      <nav className="navbar navbar-expand-lg navbar-dark py-3">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            <span className="text-gold">Nexora</span>
          </NavLink>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <NavLink end to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link position-relative">
                  Cart
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/checkout" className="nav-link">
                  Checkout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
