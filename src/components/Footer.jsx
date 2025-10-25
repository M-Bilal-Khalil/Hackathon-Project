import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-dark">
      <div className="container py-5">
        <div className="row gy-4 align-items-start">
          {/* Brand / About */}
          <div className="col-12 col-md-4">
            <h4 className="fw-bold mb-3 brand-text">
              <span className="text-gold">ShopMini</span> Luxe
            </h4>
            <p className="footer-desc">
              Discover premium products, crafted with elegance. Experience
              shopping redefined — quality, comfort, and class.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-4">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li>
                <NavLink end to="/" className="footer-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="footer-link">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/checkout" className="footer-link">
                  Checkout
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-6 col-md-4">
            <h6 className="footer-heading">Contact</h6>
            <ul className="list-unstyled footer-contact">
              <li>Email: support@shopminiluxe.com</li>
              <li>Phone: +92 300 1234567</li>
              <li>Address: Peshawar, Pakistan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
        <div className="container text-center">
          © {new Date().getFullYear()} ShopMini Luxe — All rights reserved.
        </div>
    </footer>
  );
}
