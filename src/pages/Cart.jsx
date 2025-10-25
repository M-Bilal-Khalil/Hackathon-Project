import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalItems, totalPrice } = useCart();

  function inc(id) {
    const item = cart.find(p => p.id === id);
    if (item) updateQty(id, item.qty + 1);
  }

  function dec(id) {
    const item = cart.find(p => p.id === id);
    if (item) updateQty(id, Math.max(0, item.qty - 1));
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="empty-cart text-center py-5">
        <h2 className="fw-bold text-light mb-3">Your cart is empty 🛒</h2>
        <p className="text-muted">
          <Link to="/" className="text-gold text-decoration-none fw-semibold">
            Continue Shopping →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <section className="cart-page container py-5">
      {/* Title */}
      <div className="text-center mb-5">
        <h2 className="cart-title fw-bold">
          <span className="text-gold">Your</span> Cart
        </h2>
        <p className="textsmall">
          Review your selected items before checkout.
        </p>
      </div>

      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-12 col-lg-8">
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onInc={inc}
              onDec={dec}
              onDelete={removeFromCart}
            />
          ))}
        </div>

        {/* Order Summary */}
        <aside className="col-12 col-lg-4">
          <div className="summary-card p-4">
            <h5 className="summary-title mb-4"><span className="text-gold">Order Summary</span></h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="d-flex justify-content-between fw-semibold mb-3">
              <span>Total</span>
              <span className="text-gold">${totalPrice.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="btn btn-gold w-100 mt-3 fw-semibold py-2"
            >
              Proceed to Checkout
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
