const NavBar = () => {
  return (
    <nav className="bg-slate-500 w-screen flex p-3 items-center justify-between">
      <span className="font-semibold">E-COMMERCE</span>
      <div className="text-sm">
        <a href="#" className="px-2">
          products
        </a>
        <a href="#" className="px-2">
          Orders
        </a>
      </div>
      <input
        type="search"
        className="p-2 rounded-md w-1/3"
        name="search"
        placeholder="Search by product name"
        id=""
      />
      <button>login</button>
    </nav>
  )
}

export default NavBar
