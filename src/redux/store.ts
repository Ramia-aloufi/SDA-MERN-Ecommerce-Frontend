import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import CategoriesReducer from './slices/categories/categorySlice'
import UsersReducer from './slices/user/UserSlice'
import OrderSlice from './slices/Order/OrderSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: CategoriesReducer,
    users: UsersReducer,
    orders: OrderSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
