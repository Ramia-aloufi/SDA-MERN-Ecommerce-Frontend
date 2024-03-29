import { createSlice } from '@reduxjs/toolkit'

import {
  fetchProduct,
  deleteSingleProduct,
  updateSingleProduct,
  getSingleProduct,
  postProduct
} from '../../../Servies/product'
import Product from '../../../models/Product'
import CartItem from '../../../models/Cart'
import QueryParams from '../../../models/QueryParams'




type ProductState = {
  items: Product[]
  products: Product[]
  error: null | string
  status: null | string
  isLoading: boolean
  singleProduct: Product
  inCart: CartItem[]
  saved: Product[]
  searchTerm: string
  searchedResult: Product[]
  totalQuantity: number
  totalPrice: number
  totalPages: number
  currentPage: number
  query: QueryParams
  savedItem: Product[]
  productsCount: number
}
const initialState: ProductState = {
  items: [],
  error: null,
  status: null,
  products: [],
  isLoading: false,
  singleProduct: {} as Product,
  inCart: [],
  saved: [],
  searchTerm: '',
  searchedResult: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalPages: 0,
  currentPage: 0,
  query: {} as QueryParams,
  savedItem: [],
  productsCount: 0
}

 const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
      state.status = null
    },
    clearCart: (state) => {
      state.inCart = []
    },
    searchProduct: (state, action) => {
      const search = action.payload
      state.searchTerm = search
    },
    addToCart: (state, action) => {
      const product: Product = action.payload
      const isExist = state.inCart.find((cart) => cart.product._id === product._id)

      if (!isExist) {
        state.inCart.push({ product: product, quantity: 1 })
      } else {
        state.inCart = state.inCart.map((item) =>
          item.product._id === product._id
            ? { product: item.product, quantity: item.quantity + 1 }
            : item
        )
      }

      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      )
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.inCart = state.inCart.filter((item) => item.product._id != id)
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      )
    },
    IncreaseQuantity: (state, action) => {
      const productIncreas: Product = action.payload
      state.inCart.map((item) => {
        if (item.product._id == productIncreas._id) {
          item.quantity += 1
        }
      })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      )
    },
    DecreaseQuantity: (state, action) => {
      const productIncreas: Product = action.payload
      state.inCart.map((item) => {
        if (item.product._id == productIncreas._id) {
          if (item.quantity > 0) {
            item.quantity -= 1
          }
        }
      })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      )
    },
    SavedItem: (state, action) => {
      const item = action.payload
      state.status = 'Saved product successfully !'
      const isExist = state.saved.find((product) => product._id === item._id)
      if (!isExist) {
        state.saved.push(item)
      } else {
        state.saved = state.saved.filter((product) => product._id !== item._id)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const { payload, totalPages, currentPage, message, productsCount } = action.payload
        state.isLoading = false
        state.currentPage = currentPage
        state.totalPages = totalPages
        state.items = payload
        state.products = state.items
        state.status = message
        state.productsCount = productsCount
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.isLoading = false
        const { payload, message } = action.payload
        state.status = message
        state.items.push(payload)
        state.products = state.items
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        const { payload, message } = action.payload
        state.status = message
        state.items = state.items.filter((product) => product.slug != payload.slug)
        state.products = state.items
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleProduct = action.payload
      })
      .addCase(updateSingleProduct.fulfilled, (state, action) => {
        const { payload, message } = action.payload
        state.status = message
        state.items = state.items.map((category) =>
          category._id === payload._id ? payload : category
        )
        state.products = state.items
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false
          state.error = ''
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload.response.data.errors.message || 'An error occurred.'
          state.status = null
        }
      )
  }
})
export const {
  searchProduct,
  addToCart,
  removeFromCart,
  IncreaseQuantity,
  DecreaseQuantity,
  clearError,
  clearCart,
  SavedItem
} = productSlice.actions

export default productSlice.reducer
