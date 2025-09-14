import React from "react";
import ProductCard from "./Components/ProductCard";
import "./App.css";

function App() {
  const products = [
    { name: "Laptop", price: "$800", stock: "In Stock" },
    { name: "Smartphone", price: "$500", stock: "Out of Stock" },
    { name: "Headphones", price: "$120", stock: "In Stock" },
    { name: "Tablet", price: "$300", stock: "In Stock" }
  ];

  return (
    <div className="app-container">
      <h1 className="heading">Product List</h1>
      <div className="product-list">
        {products.map((item, index) => (
          <ProductCard
            key={index}
            name={item.name}
            price={item.price}
            stock={item.stock}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
