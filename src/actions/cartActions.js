import axios from "axios"
import * as actions from "../constants/cartConstants"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  console.log(`${process.env.REACT_APP_API}/items/${id}`, "<<<<")
  const { data } = await axios.get(`${process.env.REACT_APP_API}/items/${id}`)
  dispatch({
    type: actions.CART_ADD_REQUEST,
    payload: {
      _id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      numInStock: data.numInStock,
      qty: Number(qty),
    },
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actions.CART_REMOVE_REQUEST,
    payload: id,
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
