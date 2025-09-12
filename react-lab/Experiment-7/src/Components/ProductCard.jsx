import React from "react";

function ProductCard({ name, price, stock }) {
  return (
    <div style={{
      border: "2px solid #ddd",
      borderRadius: "10px",
      padding: "16px",
      margin: "12px",
      width: "250px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <p>Status: {stock}</p>
    </div>
  );
}

export default ProductCard;