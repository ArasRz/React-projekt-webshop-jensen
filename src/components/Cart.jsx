import React, { useEffect, useState } from 'react'
import Image from '../images/pic small.png'
import { Link } from 'react-router-dom'

const Cart = (props) => {
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
    
    function emptyCart () {
      props.setCartList([]);
    }
  return (
    <div>
        <table id='cart'>
          
          <tbody>
            {props.cartList !==undefined ? cartProducts.map(product => {
            return  <tr id='cartRow' key={product._id}>
                      <td id='cartImage'><img src={Image} alt=''/></td>
                      <td className='cartText'>{product.title}</td>
                      <td className='cartText'>{product.price}</td>
                      <td className='cartText'>{product.amount}</td>
                      <button onClick={deleteProduct} id={product._id}>Delete Product</button>
                    </tr>
            }):null}
          <button onClick={emptyCart}>Empty cart</button>
          </tbody>

          <tfoot>
            Total price: {totalPrice}
            <button style={{marginLeft: "50px"}}>
                <Link to={{ pathname: `/checkout` }}>Checkout</Link>
            </button>
          </tfoot>
    </table>
      
    </div>
  )
}

export default Cart

