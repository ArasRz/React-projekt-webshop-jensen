import React from 'react'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Products from './Products'
import { useEffect } from 'react'
import styled from 'styled-components';
import Image from '../images/pic.png'



function Product({cartList, setCartList}) {

  const { productId } = useParams();
  const [product,setProduct]=useState([])

  const fetchData = async () => {
    try{
      const response = await fetch(`https://product-api-production-94fe.up.railway.app/products/${productId}`)
      const data =  await response.json()
      setProduct(data)
      console.log(data)
    } catch(error){
        console.log(error)
    }
    }
    
    useEffect(() => {
      fetchData()
    }, []);

    function addToCart (e) {
      e.preventDefault();
      setCartList([...cartList,
        e.target.id])
        console.log(cartList);
    }

  return (
    <div>
      <ProductImage src={Image} />
      <h2>Title</h2>
      <p>{product.title}</p>
      <h2>Price</h2>
      <p>{product.price}</p>
      <h2>Description</h2>
      <p>{product.description}</p>
      <h2>Stock</h2>
      <p>{product.stock}</p>
      <button onClick={addToCart} id={product._id}>Add to Cart</button>


    </div>
    

  )
}

export default Product

const ProductImage = styled.img`
  width: 20%;
  margin-left: 20%;
  height: 250px;
  object-fit: cover;
`;