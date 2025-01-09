import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/products/add_product", // Replace with your actual API endpoint
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Product added successfully!");
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding product.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProduct;
