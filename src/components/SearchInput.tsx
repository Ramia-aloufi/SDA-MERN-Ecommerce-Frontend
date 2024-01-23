import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash'

import { fetchProduct } from '../Servies/product'
import { fetchCategory } from '../Servies/category'
import { fetchUser } from '../Servies/user'
import AppDispatch from '../models/AppDispatch'

const SearchInput = () => {
  const currentPath = location.pathname
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    debouncedSearch(value)
  }
  const debouncedSearch = debounce((value: string) => {
    switch (currentPath) {
      case '/admin/category':
        dispatch(fetchCategory({ search: value }))
        break
      case '/admin/users':
        dispatch(fetchUser({ search: value }))
        break
      default:
        dispatch(fetchProduct({ search: value }))
    }
  }, 1000)
  useEffect(() => {
    history.state
  }, [history])

  return (
    <input
      type="search"
      onChange={handleChange}
      className="p-2 rounded-md w-1/2 "
      name="search"
      placeholder="What can I help you find?"
      id=""
    />
  )
}

export default SearchInput
