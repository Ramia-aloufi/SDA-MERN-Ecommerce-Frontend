import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center h-full flex-wrap ">
      <div className="text-center space-y-4">
        <img
          src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085813-3385482.png?f=webp" // Replace with your empty cart image path
          alt="Empty Cart"
          className="w-1/2 mx-auto mb-4"
        />
        <div className="">
          <p className="text-gray-600">Your cart is empty</p>
          <p className="text-gray-500 font-light">
            Haven't found what you're looking for? Keep exploring!
          </p>
        </div>

        <Link to="/">
          <button className="text-[#f88648] mt-5">Go Home</button>
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart
