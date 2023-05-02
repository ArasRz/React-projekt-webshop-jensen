import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Routes,Route,Router } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from './components/Cart'
import Nav from "./components/Nav";
import Header from './components/Header'
import ManageProducts from "./pages/admin/ManageProducts";
import EditProduct from "./pages/admin/EditProduct";
import axios from "axios";
import CreateProduct from "./pages/admin/CreateProduct";
import styled from "styled-components";
import Checkout from "./pages/Checkout";


function App() {
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([])

  const fetchData = async () => {
    try{
      const response = await axios.get('https://product-api-production-94fe.up.railway.app/products')
      const data = response.data;
      setProductList(data)
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const NotFound = () => {
    return (
      <div>
        <h1>404 - Sidan kunde inte hittas</h1>
        <p>Tyvärr, sidan du letar efter finns inte.</p>
      </div>
    );
  };

  return (
    <div className="App">
      <Header cartList={cartList} setCartList={setCartList}/>
    
      <Routes>
        <Route path="/" element={<Title>Welcome to the Webbshop!</Title>} />
        <Route path="/admin/manageproducts" element={<ManageProducts/>} />
        <Route path="/admin/editproduct/:id" element={<EditProduct/>} />
        <Route path="/admin/createproduct" element={<CreateProduct />} />
        <Route path="/products" element={<Products productList={productList} cartList={cartList} setCartList={setCartList}/>} />
        <Route path="/product/:productId" element={<Product cartList={cartList} setCartList={setCartList}  />} />
        <Route path="/checkout" element = {<Checkout cartList={cartList} setCartList={setCartList}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #808080;
`;

export default App
