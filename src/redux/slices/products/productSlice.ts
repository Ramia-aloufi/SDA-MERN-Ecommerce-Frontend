import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import {
  fetchProduct,
  deleteSingleProduct,
  updateSingleProduct,
  getSingleProduct,
  postProduct
} from '../../../Servies/product'
import { Category } from '../categories/categorySlice'

export type Product = {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  quantity: number
  sold: number
  image: string
  category: Category['_id']
  createdAt?: Date
  updatedAt?: Date
  __v: number
}
// export type ProductInput = {
//   title: string
//   description: string
//   price: number
//   quantity: number
//   image?: string
//   category: string
// }
export type CartItem = {
  product: Product
  quantity: number
}

export type ProductState = {
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
  savedItem: Product[]
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
  savedItem: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
      state.status = null
    },
    searchProduct: (state, action) => {
      console.log(action.payload)
      const search = action.payload
      state.searchTerm = search
      // state.searchedResult = state.searchTerm
      //   ? state.items.filter((product) =>
      //       product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      //     )
      //   : []
      // state.products = state.searchedResult.length > 0 ? state.searchedResult : state.items
    },
    sortProduct: (state, action) => {
      const sortBy = action.payload
      switch (sortBy) {
        case 'price':
          state.products.sort((a, b) => a.price - b.price)
          break
        case 'name':
          state.products.sort((a, b) => a.title.localeCompare(b.title))
          break
        default:
          state.products
      }
    },
    addToCart: (state, action) => {
      const product: Product = action.payload
      console.log(product)
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
      console.log(product.price)
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
        console.log(productIncreas)
      })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      )
    },
    FilterByCategory: (state, action) => {
      const id = action.payload
      state.products = state.items
      if (id != 0) {
        state.products = state.products.filter((product) => product.category.includes(id))
        state.products = state.items
      }
    },
    SavedItem: (state, action) => {
      const item = action.payload
      state.status = 'Saved product successfully !'
      const isExist = state.saved.find((product) => product._id === item._id)
      if (!isExist) {
        state.saved.push(item)
      } else {
        state.status = 'Product already saved!'
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.products = state.items
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
          state.error = action.payload || 'An error occurred.'
          console.log(state.error)
        }
      )
  }
})
export const {
  searchProduct,
  sortProduct,
  addToCart,
  removeFromCart,
  IncreaseQuantity,
  DecreaseQuantity,
  FilterByCategory,
  clearError,
  SavedItem
} = productSlice.actions

export const productState = (state: RootState) => state.products

export default productSlice.reducer
