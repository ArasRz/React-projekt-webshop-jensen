import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      _id: Date.now(),
      title,
      price,
      stock,
      category,
      description,
    };

    try {
      await axios
        .post("https://product-api-production-94fe.up.railway.app/products", newProduct)
        .then((res) => console.log(res));
      navigate("/admin/manageproducts");
      window.location.reload();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <CreateProductForm>
      <Title>Create Product</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Title:
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Label>
        <Label>
          Price:
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </Label>
        <Label>
          Stock:
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
          />
        </Label>
        <Label>
          Category:
          <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </Label>
        <Label>
          Description:
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Label>
        <Button type="submit">Create Product</Button>
        <Link to="/admin/manageproducts">ManageProducts</Link>

      </Form>
    </CreateProductForm>
  );
};

const CreateProductForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #808080;
  margin-bottom: 1em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5em;
`;

const Input = styled.input`
  padding: 0.5em;
  font-size: 1em;
  border-radius: 3px;
  border: 1px solid #b2beb5;
`;

const Button = styled.button`
  background: white;
  color: #b2beb5;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.5em 1em;
  border: 1px solid #36454f;
  border-radius: 3px;
  cursor: pointer;
`;

export default CreateProduct;


