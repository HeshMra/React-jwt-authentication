import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../CSS/AllProducts.module.css";


const HandleProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const [products, setProducts] = useState([]); // For storing all products
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");



  // ---------------fetching all the products--------------------

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/all_product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  //-------------------fetching single product----------------------
  const fetchSingleProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/single_product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetch product:", error);
    }
  };



  // -------------add product----------------------------------
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
      setProductData({ name: "", quantity: 0, price: 0 }); // Reset form
      fetchProducts(); // Refresh product list
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding product.");
      console.error(error);
    }
  };

  // ------------------------Delete Product--------------------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/delete_product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setMessage("Product deleted successfully!");
      alert("Product deleted successfully!");
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      // setMessage(error.response?.data?.message || "Error deleting product.");
      alert("Error deleting product.");
      console.error(error);
    }
  };

  // ------------------------update Product----------------------------
  const handleUpdate = async (id) => {
    try {
    // Exclude _id from productData
    const { _id, ...updateData } = productData;
      await axios.put(`http://localhost:5000/products/update_product/${id}`, updateData, { // Send only the updated fields
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setMessage("Product updated successfully!");
      alert("Product updated successfully!");
      fetchProducts(); // Refresh product list after deletion
      setProductData({ name: "", quantity: 0, price: 0 }); // Reset form
    } catch (error) {
      // setMessage(error.response?.data?.message || "Error deleting product.");
      alert("Error updating product.");
      console.error(error);
    }
  };



  return (
    <div className={styles.mainContainer}>

      <div className={styles.productContainer}>
        <h2 className={styles.productHeading}>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <label className={styles.inputlabel}>Product Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              className={styles.productInput}
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputlabel}>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              required
              className={styles.productInput}
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputlabel}>Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              className={styles.productInput}

            />
          </div>
          <button type="submit" className={styles.addButton}>Add Product</button>
          <button type="button" onClick={() => handleUpdate(productData._id)} className={styles.addButton}>update Product</button>
        </form>
        {message && <p>{message}</p>}
      </div>

      {/* ------------------Product table------------------------- */}
      <div className={styles.tableContainer}>
        <h2 className={styles.productHeading}>Product List</h2>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>Rs.{product.price}</td>
                <td><button onClick={() => handleDelete(product._id)} className={styles.deleteButton}>Delete</button></td>
                <td><button onClick={() => fetchSingleProduct(product._id)} className={styles.updateButton}>edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default HandleProduct;
