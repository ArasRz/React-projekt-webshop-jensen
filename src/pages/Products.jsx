import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Image from '../images/pic.png'

function Products({ productList, cartList, setCartList }) {
  function newaddtoCart(e) {
    e.preventDefault();
    let newList = [];
    let sameId= true;

    for(const cartId of cartList) {
        newList=[...newList, cartId]
    }
    if(newList.length === 0){
      newList = [...newList, {id:e.target.id, amount:0}];
      setCartList(newList)
    }
    for(const listItem of newList) {
      if(e.target.id === listItem.id){
        sameId = true;
        listItem.amount++;
        setCartList(newList)
        break;
      } else {
        sameId = false;
      }
    }
    if(sameId === false){
      newList = [...newList, {id:e.target.id, amount:1}];
      setCartList(newList)
    }
  }

  return (
    <>
    
      <Container>
        {productList.map((item) => {
          return (
            <Card key={item._id}>
              <ProductImage src={Image} />
              <ProductInfo>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPrice>{item.price} kr</ProductPrice>
                <button onClick={newaddtoCart} id={item._id}>Add to Cart</button>
                <ViewProductButton>
                  <Link to={{ pathname: `/product/${item._id}` }}>View product</Link>
                </ViewProductButton>
              </ProductInfo>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  width: 300px;
  height: 450px;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
    transform: translateY(-0.5rem);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const ViewProductButton = styled.button`
  display: block;
  background-color: #b2beb5;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #90a39e;
  }
`;

export default Products;
