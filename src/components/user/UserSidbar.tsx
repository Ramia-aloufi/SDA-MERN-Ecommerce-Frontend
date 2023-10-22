import { Link } from 'react-router-dom'

export const UserSidbar = () => {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/admin/category" /> Category
        </li>
        <li>
          <Link to="/admin/product" />
          Products
        </li>
      </ul>
    </aside>
  )
}
