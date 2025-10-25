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
    <section className="checkout-page container py-4">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="checkout-title fw-bold">
          <span className="text-gold">Checkout</span> Details
        </h2>
        <p className="small text-muted">
          Fill in your information and confirm your order.
        </p>
      </div>

      <div className="row g-3">
        {/* Checkout Form */}
        <div className="col-12 col-lg-7">
          <form className="checkout-form p-3 p-lg-4 rounded-3" onSubmit={handleSubmit}>
            <h5 className="form-heading mb-3">Billing Information</h5>

            <div className="mb-2">
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

            <div className="mb-2">
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

            <div className="mb-2">
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

            <div className="row g-2">
              <div className="col-6">
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
              <div className="col-6">
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

            <button
              type="submit"
              className="btn btn-gold w-100 mt-3 py-2 fw-semibold"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <aside className="col-12 col-lg-5">
          <div className="checkout-summary p-3 p-lg-4 rounded-3">
            <h5 className="summary-heading mb-3">Order Summary</h5>
            <ul className="list-unstyled mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                  style={{ gap: "10px" }}
                >
                  <span
                    className="text-truncate small flex-grow-1"
                    style={{ maxWidth: "65%" }}
                    title={item.title}
                  >
                    {item.title}
                  </span>
                  <span className="text-gold fw-semibold flex-shrink-0">
                    {item.qty} × ${item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between border-top pt-2 fw-bold">
              <span>Total</span>
              <span className="text-gold">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
