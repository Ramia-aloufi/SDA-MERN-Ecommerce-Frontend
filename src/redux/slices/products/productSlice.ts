import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import {
  fetchProduct,
  deleteSingleProduct,
  updateSingleProduct,
  getSingleProduct
} from '../../../Servies/product'
import axios from 'axios'
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
  category: Category
  createdAt?: Date
  updatedAt?: Date
  __v: number
}
export type ProductInput = {
  title: string
  description: string
  price: number
  quantity: number
  image?: string
  category: string
}

export type ProductState = {
  items: Product[]
  products: Product[]
  error: null | string
  isLoading: boolean
  singleProduct: Product
  inCart: Product[]
  searchTerm: string
  searchedResult: Product[]
  totalQuantity: number
  totalPrice: number
  savedItem: Product[]
}
const initialState: ProductState = {
  items: [],
  error: null,
  products: [],
  isLoading: false,
  singleProduct: {} as Product,
  inCart: [],
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
    findById: (state, action) => {
      // console.log('action', action)
      // state.singleProduct = action.payload
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
          // state.products.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          state.products
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload
      // state.items = state.items.filter((product) => product.id !== id)
      state.products = state.items
    },
    addProduct: (state, action) => {
      const id = state.items.length + 1
      const name = action.payload
      console.log(`name:${name}`)
      const newProduct: Product = { id, ...name }
      // console.log(`newProduct:${newProduct.id}`)
      state.items = [...state.items, newProduct]
      state.products = state.items
      console.log(state.items.length)
    },
    UpdateProduct: (state, action) => {
      // const updatedProduct: Product = action.payload
      // axios.put('/products', updatedProduct).then()
      // state.items = state.items.map((product) =>
      //   // product.id === updatedProduct.id ? updatedProduct : product
      // )
      state.products = state.items
    },
    addToCart: (state, action) => {
      const newProduct: Product = action.payload
      const isExist = state.inCart.find((cart) => cart._id === newProduct._id)

      if (!isExist) {
        state.inCart = [...state.inCart, { ...newProduct, quantity: 1 }]
      } else {
        // state.inCart = state.inCart.map((product) =>
        //   product.id === newProduct.id ? { ...product, quantity: product.quantity + 1 } : product
        // )
      }

      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    removeFromCart: (state, action) => {
      const id: number = action.payload
      // state.inCart = state.inCart.filter((product) => product.id !== id)
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    IncreaseQuantity: (state, action) => {
      const productIncreas: Product = action.payload
      // state.inCart.map((product) => {
      // //   if (product.id == productIncreas.id) {
      // //     product.quantity += 1
      // //   }
      // //   console.log(productIncreas)
      // // })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    DecreaseQuantity: (state, action) => {
      const productIncreas: Product = action.payload
      state.inCart.map((product) => {
        // if (product.id == productIncreas.id) {
        //   if (product.quantity > 0) {
        //     product.quantity -= 1
        //   }
        // }
        console.log(productIncreas)
      })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    FilterByCategory: (state, action) => {
      const id: number = action.payload
      state.products = state.items
      // if (id != 0) {
      //   state.products = state.products.filter((product) => product.categories.includes(id))
      //   // state.products = state.items
      // }
    },
    SavedItem: (state, action) => {
      const item: Product = action.payload
      // state.items.map((product) => product._id == item._id && (product.saved = !product.saved))
      // state.items.map((product) => product._id == item._id)

      // state.products = state.items
      // state.savedItem = state.items.filter((product) => product.saved == true)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.products = state.items
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
        state.items = state.items.filter((product) => product.slug != String(action.payload))
        state.products = state.items
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleProduct = action.payload
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
          state.error = action.error.message || 'An error occurred.'
        }
      )
  }
})
export const {
  findById,
  searchProduct,
  sortProduct,
  UpdateProduct,
  addProduct,
  deleteProduct,
  addToCart,
  removeFromCart,
  IncreaseQuantity,
  DecreaseQuantity,
  FilterByCategory,
  SavedItem
} = productSlice.actions

export const productState = (state: RootState) => state.products

export default productSlice.reducer
