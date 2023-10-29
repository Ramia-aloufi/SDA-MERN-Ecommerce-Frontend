import { Link } from 'react-router-dom'
const UserSidbar = () => {
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
export default UserSidbar
