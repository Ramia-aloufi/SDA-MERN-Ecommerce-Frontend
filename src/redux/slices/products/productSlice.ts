import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
  quantity: number
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
  totalPrice: 0
}

export const fetchProduct = createAsyncThunk('product/fetchData', async () => {
  const response = await api.get('/mock/e-commerce/products.json')
  if (!response.statusText) {
    throw new Error('Network response error')
  }
  const data: Product[] = await response.data
  return data
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    findById: (state, action) => {
      const id = action.payload
      console.log('findById')

      const foundProduct = state.items.find((product) => product.id === Number(id))

      if (foundProduct) {
        console.log('Product found')
        state.singleProduct = foundProduct
        console.log(foundProduct)
        console.log(state.singleProduct)
      } else {
        console.log('Product not found')
        state.singleProduct = {} as Product
      }
    },
    searchProduct: (state, action) => {
      console.log(action.payload)
      const search = action.payload
      state.searchTerm = search
      state.searchedResult = state.searchTerm
        ? state.items.filter((product) =>
            product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : []
      state.products = state.searchedResult.length > 0 ? state.searchedResult : state.items
    },
    sortProduct: (state, action) => {
      const sortBy = action.payload
      switch (sortBy) {
        case 'price':
          state.products.sort((a, b) => a.price - b.price)
          break
        case 'name':
          state.products.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          state.products
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((product) => product.id !== id)
      state.products = state.items
    },
    addProduct: (state, action) => {
      const id = state.items.length + 1
      const name = action.payload
      console.log(`name:${name}`)
      const newProduct: Product = { id, ...name }
      console.log(`newProduct:${newProduct.id}`)
      state.items = [...state.items, newProduct]
      state.products = state.items
      console.log(state.items.length)
    },
    UpdateProduct: (state, action) => {
      const updatedProduct: Product = action.payload
      state.items = state.items.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
      state.products = state.items
    },
    addToCart: (state, action) => {
      const newProduct: Product = action.payload
      const isExist = state.inCart.find((cart) => cart.id === newProduct.id)

      if (!isExist) {
        state.inCart = [...state.inCart, { ...newProduct, quantity: 1 }]
      } else {
        state.inCart = state.inCart.map((product) =>
          product.id === newProduct.id ? { ...product, quantity: product.quantity + 1 } : product
        )
      }

      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    removeFromCart: (state, action) => {
      const id: number = action.payload
      state.inCart = state.inCart.filter((product) => product.id !== id)
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    IncreaseQuantity: (state, action) => {
      const productIncreas: Product = action.payload
      state.inCart.map((product) => {
        if (product.id == productIncreas.id) {
          product.quantity += 1
        }
        console.log(productIncreas)
      })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    DecreaseQuantity: (state, action) => {
      const productIncreas: Product = action.payload
      state.inCart.map((product) => {
        if (product.id == productIncreas.id) {
          if (product.quantity > 0) {
            product.quantity -= 1
          }
        }
        console.log(productIncreas)
      })
      state.totalQuantity = state.inCart.reduce((total, product) => total + product.quantity, 0)
      state.totalPrice = state.inCart.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      )
    },
    FilterByCategory: (state, action) => {
      const id = action.payload
      state.products = state.items
      state.products = state.products.filter((product) => product.categories.includes(id))
      // state.products = state.items
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.products = state.items
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'An error occurred.'
      })
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
  FilterByCategory
} = productSlice.actions
export const productState = (state: RootState) => state.products

export default productSlice.reducer
