import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://product-api-production-94fe.up.railway.app/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleDelete = async(id) => {
    const deletedItem = await axios.delete(`https://product-api-production-94fe.up.railway.app/products/${id}`)
    console.log(deletedItem);
    alert("The product is deleted")
    navigate("/")
    window.location.reload()
  }

  const handleUpdate = (id) => {
    navigate(`/admin/editproduct/${id}`);
    window.location.reload();
  }

  return (
    <Container>
      <Title>Manage Products</Title>
      <CreateButton to="/admin/createproduct">Create Product</CreateButton>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Stocks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price} SEK</td>
              <td>{product.stock}</td>
              <td>
                <UpdateButton onClick={() => handleUpdate(product._id)}>Update</UpdateButton>
                <DeleteButton onClick={() => handleDelete(product._id)}>Delete</DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 2em;
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #333;
  margin-bottom: 1em;
`;

const CreateButton = styled(Link)`
  display: block;
  background-color: #808080;
  color: white;
  padding: 0.5em;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 1em;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: silver;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const UpdateButton = styled.button`
  background-color: #808080;
  color: white;
  padding: 0.5em 1em;
  border-radius: 4px;
  margin-right: 0.5em;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: silver;
  }
`;

const DeleteButton = styled.button`
  background-color: white;
  color: #808080;
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: darkwhite;
  }
`;

export default ManageProducts;


