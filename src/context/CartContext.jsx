import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.id !== id));
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(p => (p.id === id ? { ...p, qty } : p)));
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((s, p) => s + p.qty, 0);
  const totalPrice = cart.reduce((s, p) => s + p.qty * p.price, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
