import React, { useEffect, useState } from 'react'
import Image from '../images/pic small.png'
import { Link } from 'react-router-dom'

const Checkout = (props) => {
    const [cartProducts, setCartProducts] = useState([])

    const fetchCartProduct = async (id) => {
        try{
          const response = await fetch(`https://product-api-production-94fe.up.railway.app/products/${id}`)
          const data = await response.json()
          return data
        } catch(error){
          console.log(error)
        }
      }
      
    useEffect(() => {
        const fetchCartProducts = async () => {
            const newList = [];
            for(const product of props.cartList){
                let newProduct = await fetchCartProduct(product.id);
                newProduct = {...newProduct, amount: product.amount}
                newList.push(newProduct);
            }
            setCartProducts(newList);
        }
        fetchCartProducts();
    }, [props.cartList])

    let totalPrice = 0;

    for(const cartProduct of cartProducts) {
        totalPrice = totalPrice + cartProduct.price*cartProduct.amount;
    }

    function deleteProduct(e) {
      e.preventDefault();
      const productId = e.target.id; 
      const updatedCart = props.cartList.filter(product => product.id !== productId); 
      props.setCartList(updatedCart); 
    }

    function decreaseAmount (e) {
      e.preventDefault()
      let found = props.cartList.findIndex(product => product.id === e.target.id)
      let newList = [];

      for(const cartId of props.cartList) {
        newList=[...newList, cartId]
      }
      if(newList[found].amount > 1) {
        newList[found].amount--;
      }
      props.setCartList(newList);
    }

    function increaseAmount (e) {
      e.preventDefault()
      let found = props.cartList.findIndex(product => product.id === e.target.id)
      let newList = [];

      for(const cartId of props.cartList) {
        newList=[...newList, cartId]
      }
      newList[found].amount++;
      props.setCartList(newList);
    }

  return (
    <div>
        <table>
          
          <tbody>
            {props.cartList !==undefined && props.cartList.length > 0 ? cartProducts.map(product => {
            return  <tr id='checkoutRow' key={product._id}>
                      <td id='cartImage'><img src={Image} alt=''/></td>
                      <td className='cartText'>{product.title}</td>
                      <td className='cartText'>{product.price}</td>
                      <button onClick={decreaseAmount} id={product._id}>-</button>
                      <td className='cartText'>{product.amount}</td>
                      <button onClick={increaseAmount} id={product._id}>+</button>
                      <button onClick={deleteProduct} id={product._id}>Delete Product</button>
                    </tr>
            }):
            <div>
                <p>cart is empty</p>
                <button style={{marginLeft: "100px"}}>
                <Link to={{ pathname: `/products` }}>Product page</Link>
                </button>
            </div>}
                
            
          </tbody>

          <tfoot>
          {totalPrice > 0 ? `Total price: ${totalPrice}`
            : null}
          </tfoot>
    </table>
      
    </div>
  )
}

export default Checkout
