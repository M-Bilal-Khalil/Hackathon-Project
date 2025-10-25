import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <section className="checkout-page container py-5">
      <div className="text-center mb-5">
        <h2 className="checkout-title fw-bold">
          <span className="text-gold">Checkout</span> Details
        </h2>
        <p className="textsmall">
          Please fill in your information and confirm your order.
        </p>
      </div>

      <div className="row g-4">
        {/* Checkout Form */}
        <div className="col-12 col-lg-7">
          <form className="checkout-form p-4 rounded-4" onSubmit={handleSubmit}>
            <h5 className="form-heading mb-4">Billing Information</h5>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control luxe-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control luxe-input"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control luxe-input"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control luxe-input"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-6 mb-3">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  className="form-control luxe-input"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-gold w-100 mt-3 py-2 fw-semibold">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <aside className="col-12 col-lg-5">
          <div className="checkout-summary p-4 rounded-4">
            <h5 className="summary-heading mb-4">Order Summary</h5>
            <ul className="list-unstyled mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <span className="text-truncate small">{item.title}</span>
                  <span className="text-gold fw-semibold">
                    ${item.price.toFixed(2)} × {item.qty}
                  </span>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between border-top pt-3 fw-bold">
              <span>Total</span>
              <span className="text-gold">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
