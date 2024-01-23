import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/products/productSlice'
import CategoriesReducer from './slices/categories/categorySlice'
import UsersReducer from './slices/user/userSlice'
import OrderSlice from './slices/Order/orderSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: CategoriesReducer,
    users: UsersReducer,
    orders: OrderSlice
  }
})
export default store
