// import { categoryState } from '../redux/slices/categories/categorySlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { FilterByCategory } from '../redux/slices/products/productSlice'

// const CategoryFilter = () => {
//   const { categories } = useSelector(categoryState)
//   const dispatch = useDispatch()
//   const onCategoryClicked = (id: string) => {
//     dispatch(FilterByCategory(id))
//   }
//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto">
//         <div className="flex gap-2 justify-start">
//           <button
//             className="border p-2 rounded-md block text-left text-base font-light"
//             onClick={() => {
//               dispatch(FilterByCategory(0))
//             }}>
//             All
//           </button>
//           {categories.map((category) => (
//             <button
//               onClick={() => onCategoryClicked(category._id)}
//               className="border p-2 bg-white rounded-md block whitespace-nowrap text-left text-base font-light"
//               key={category._id}>
//               {category.title}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CategoryFilter
