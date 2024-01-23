import { configureStore } from '@reduxjs/toolkit'
import { CategoriesReducer, OrderSlice, UsersReducer, productsReducer } from './slices'


const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: CategoriesReducer,
    users: UsersReducer,
    orders: OrderSlice
  }
})
export default store
