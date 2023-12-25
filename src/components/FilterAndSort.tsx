import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category, categoryState } from '../redux/slices/categories/categorySlice'
import { AppDispatch } from '../redux/store'
import { fetchProduct } from '../Servies/product'

const FilterAndSort = () => {
  const [isOpen, setIsOpen] = useState({ type: false, price: false })
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [priceFormData, setPriceFormData] = useState({ minPrice: undefined, maxPrice: undefined })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const { categories } = useSelector(categoryState)
  const dispatch = useDispatch<AppDispatch>()

  const toggleDropdown = (filter: string) => {
    setIsOpen((prevIsOpen) => {
      return filter === 'price'
        ? { ...prevIsOpen, price: !prevIsOpen.price }
        : { ...prevIsOpen, type: !prevIsOpen.type }
    })
  }

  const handleTypeClick = (category: Category) => {
    setSelectedOption(category.title)
    dispatch(fetchProduct({ categoryId: category._id }))
    setIsOpen({ type: false, price: false })
  }
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceFormData({
      ...priceFormData,
      [e.target.name]: e.target.value
    })
  }
  const handlePriceSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(priceFormData)
    dispatch(fetchProduct(priceFormData))
    setIsOpen({ type: false, price: false })
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !inputRef.current?.contains(event.target as Node)
    ) {
      setIsOpen({ type: false, price: false })
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])
  return (
    <div className="">
      <div className="filter">
        <label htmlFor="">Filter</label>
        <div className="dropdown" ref={dropdownRef}>
          <div className="selected-option" onClick={() => toggleDropdown('type')}>
            {selectedOption || 'Type'}
          </div>
          {isOpen.type && (
            <div className="options">
              {categories.map((categories) => (
                <div
                  key={categories._id}
                  className="option"
                  onClick={() => handleTypeClick(categories)}>
                  {categories.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="dropdown" ref={inputRef}>
          <div className="selected-option" onClick={() => toggleDropdown('price')}>
            {'price'}
          </div>
          {isOpen.price && (
            <form className="options gap-2 p-2 grid grid-cols-2" onSubmit={handlePriceSubmit}>
              <div className="">
                <label htmlFor="maxPrice">max</label>
                <input name="maxPrice" type="number" onChange={handlePriceChange} />
              </div>
              <div className="">
                <label htmlFor="minPrice">min</label>
                <input type="number" name="minPrice" onChange={handlePriceChange} />
              </div>
              <input type="reset" />
              <input className="btn" type="submit" />
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterAndSort
