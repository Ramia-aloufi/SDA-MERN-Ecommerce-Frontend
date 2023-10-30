import { categoryState } from '../redux/slices/categories/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { FilterByCategory } from '../redux/slices/products/productSlice'

const CategoryFilter = () => {
  const { categories } = useSelector(categoryState)
  const dispatch = useDispatch()
  const onCategoryClicked = (id: number) => {
    dispatch(FilterByCategory(id))
  }
  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="font-bold">Shop by Category</h1>
      <div className="space-y-3 mt-4 ">
        {categories.map((category) => {
          return (
            <button
              onClick={() => onCategoryClicked(category.id)}
              className=" block text-left xs:text-[12px] sm:text-[14px] text-[14px] font-light"
              key={category.id}>
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter
