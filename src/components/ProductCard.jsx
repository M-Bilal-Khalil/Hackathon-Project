import React, { useRef } from "react";

export default function ProductCard({ product, onAdd }) {
  const btnRef = useRef(null);

  const handleAdd = () => {
    // Trigger visual animation
    const btn = btnRef.current;
    if (btn) {
      btn.classList.add("btn-gold-flash");
      setTimeout(() => btn.classList.remove("btn-gold-flash"), 600);
    }

    // Call parent add function
    onAdd(product);
  };

  return (
    <div className="card prod-card h-100">
      {/* Product Image */}
      <div className="prod-img p-3">
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid"
          loading="lazy"
        />
      </div>

      {/* Product Body */}
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h6 className="product-title mb-1 text-truncate">{product.title}</h6>
          <p className="product-category text-uppercase small mb-3">
            {product.category}
          </p>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            ref={btnRef}
            className="btn btn-gold btn-sm fw-semibold"
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
