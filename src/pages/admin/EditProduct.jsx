import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  

  useEffect(() => {
    axios
      .get(`https://product-api-production-94fe.up.railway.app/products/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setStock(res.data.stock);
        setDescription(res.data.description)
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const product = { title, price, stock, description };
    console.log(product)

    axios
    .patch(`https://product-api-production-94fe.up.railway.app/products/${id}`, product)
    .then(() => {
      navigate("/admin/manageproducts");
      window.location.reload();
    })
    .catch((err) => console.log(err));
  
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title: </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Price: </label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Stock: </label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Update Product</button>
      </form>
      <Link to="/admin/manageproducts">ManageProducts</Link>

    </div>
  );
};

export default EditProduct;
