import {

  CART_ADD_ITEMS,
  CART_REMOVE_ITEMS,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD

} from '../constants/cartConstants'

import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEMS,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


//remove from cart

export const removeFromCart = (id) => (dispatch, getState) => {

  dispatch({
    type: CART_REMOVE_ITEMS,
    payload: id
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}


//Sava Shipping Address
export const saveShippingAddress = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  });
  localStorage.setItem('cartItems', JSON.stringify(data));

}

//PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })
}