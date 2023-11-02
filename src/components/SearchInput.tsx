import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from '../redux/store'
import { productState, searchProduct } from '../redux/slices/products/productSlice'
import { categoryState, searchCategory } from '../redux/slices/categories/categorySlice'
import { searchUser, userState } from '../redux/slices/user/UserSlice'

const SearchInput = () => {
  const currentPath = location.pathname
  const searchParams = new URLSearchParams(location.search)
  const dispatch = useDispatch<AppDispatch>()
  let searchTerm = ''

  const handeChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (currentPath) {
      case '/admin/category':
        dispatch(searchCategory(e.target.value))
        break
      case '/admin/users':
        dispatch(searchUser(e.target.value))
        break
      case '/':
        dispatch(searchProduct(e.target.value))
        break
      default:
        dispatch(searchProduct(e.target.value))
    }
  }
  switch (currentPath) {
    case '/admin/category':
      searchTerm = useSelector(categoryState).searchTerm
      break
    case '/admin/users':
      searchTerm = useSelector(userState).searchTerm
      break
    default:
      searchTerm = useSelector(productState).searchTerm
  }

  console.log('URL has changed to:', currentPath)
  console.log('Search parameters:', searchParams.toString())
  useEffect(() => {
    history.state
  }, [history])

  return (
    <input
      value={searchTerm}
      autoComplete="false"
      type="search"
      onChange={handeChange}
      className="p-2 rounded-md w-1/2 "
      name="search"
      placeholder="Search here"
      id=""
    />
  )
}

export default SearchInput
