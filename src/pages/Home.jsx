import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceCap, setPriceCap] = useState(1000);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        const pJson = await pRes.json();
        const cJson = await cRes.json();
        if (!mounted) return;
        setProducts(pJson || []);
        setCats(Array.isArray(cJson) ? cJson : []);
        const highest = Math.ceil(Math.max(...pJson.map((p) => p.price)));
        setPriceCap(highest);
        setMaxPrice(highest);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.price <= maxPrice)
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category === "all" ? true : p.category === category));
  }, [products, maxPrice, search, category]);

  const featured = products.slice(0, 4); // first 4 as “featured”

  if (loading) return <Loader />;

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="hero-section mb-5">
        <h1>Welcome to Nexora</h1>
        <p>Experience premium quality products with an exclusive dark style.</p>
        <a href="#featured" className="btn btn-primary btn-lg px-4 py-2">
          Explore Now
        </a>
      </section>

      {/* ===== Full Shop Section ===== */}
      <section className="mt-5">
       <div className="filters-section d-flex flex-column flex-md-row justify-content-between align-items-start gap-4 mb-5">
  <div>
    <h3 className="filters-title mb-0 text-gold" style={{ color: "#FFD700" }}>
      All Products
    </h3>
    <p className="filters-sub small" style={{ color: "#aaa" }}>
      Browse and filter products below.
    </p>
  </div>

  <div className="filters-controls d-flex flex-column flex-md-row gap-3 align-items-md-end">
    {/* Search */}
    <div className="form-group">
      <label
        className="form-label small mb-1"
        style={{ color: "#aaa" }}
      >
        Search
      </label>
      <input
        className="form-control luxe-field"
        placeholder="Search title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Category */}
    <div className="form-group">
      <label
        className="form-label small mb-1"
        style={{ color: "#aaa" }}
      >
        Category
      </label>
      <select
        className="form-select luxe-field"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All</option>
        {cats.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>

    {/* Price Range */}
    <div className="form-group w-100 w-md-auto">
      <label
        className="form-label small mb-1"
        style={{ color: "#aaa" }}
      >
        Max Price: ${maxPrice}
      </label>
      <input
        type="range"
        min="0"
        max={priceCap}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="form-range luxe-range"
      />
    </div>
  </div>
</div>



        {filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No products match the filters.
          </div>
        ) : (
          <div className="row g-3">
            {filtered.map((p) => (
              <div className="col-12 col-md-6 col-lg-4" key={p.id}>
                <ProductCard product={p} onAdd={addToCart} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
