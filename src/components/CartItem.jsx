import React from "react";

export default function CartItem({ item, onInc, onDec, onDelete }) {
  return (
    <div className="cart-item d-flex mb-3 p-3 rounded-4">
      {/* Image */}
      <div className="cart-img me-3 flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="img-fluid rounded-3"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-grow-1 me-3">
        <h6
          className="cart-item-title mb-1 text-truncate"
          title={item.title}
        >
          {item.title}
        </h6>
        <p className="cart-item-price mb-2">${item.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="d-flex align-items-center gap-2">
          <button className="qty-btn" onClick={() => onDec(item.id)}>
            −
          </button>
          <span className="qty-value">{item.qty}</span>
          <button className="qty-btn" onClick={() => onInc(item.id)}>
            +
          </button>
        </div>
      </div>

      {/* Delete */}
      <button
        className="delete-btn"
        onClick={() => onDelete(item.id)}
        title="Remove item"
      >
        ✖
      </button>
    </div>
  );
}
