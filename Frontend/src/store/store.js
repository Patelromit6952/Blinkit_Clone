import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userslice.js'
import productReducer from './productslice.js'
import cartReducer from './cartslice.js'
import addressReducer from './addressslice.js'
import orderReducer from './orderslice.js'

export const store = configureStore({
  reducer: {
    user : userReducer,
    product : productReducer,
    cartItem : cartReducer,
    addresses : addressReducer,
    orders : orderReducer
  },
})