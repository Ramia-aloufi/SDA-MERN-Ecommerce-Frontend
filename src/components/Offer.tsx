import { IoRocketOutline, IoGiftOutline, IoCardOutline } from 'react-icons/io5'

const Offer = () => {
  return (
    <div className="flex justify-between gap-5  text-[#f88648] text-opacity-50 overflow-x-scroll">
      <div className="flex  items-center min-w-[250px]  gap-2 bg-[#f88648] bg-opacity-5 p-2  md:px-4 xlg:px-8 rounded-md">
        <IoRocketOutline className="text-3xl" />
        <div className="grid">
          <span className="text-xs font-semibold">Fast & Free Shipping</span>
          <span className="text-xs">for all order over:$99</span>
        </div>
      </div>

      <div className="flex min-w-[250px]  items-center gap-2 bg-[#f88648] bg-opacity-5 p-2   md:px-4  xlg:px-8 rounded-md ">
        <IoGiftOutline className="text-3xl" />
        <div className="grid">
          <span className="text-xs font-semibold">FREE GIFT PACKAGING</span>
          <span className="text-xs">support gift service</span>
        </div>
      </div>

      <div className="flex min-w-[250px]  items-center gap-2 bg-[#f88648] bg-opacity-5 p-2   md:px-4  xlg:px-8 rounded-md ">
        <IoCardOutline className="text-3xl " />
        <div className="grid">
          <span className="text-xs font-semibold">GO SEAMLESS WITH APPLE PAY</span>
          <span className="text-xs">support gift service</span>
        </div>
      </div>
      <div className="flex min-w-[250px]  items-center gap-2 bg-[#f88648] bg-opacity-5 p-2  md:px-4 xlg:px-8 rounded-md ">
        <IoCardOutline className="text-3xl " />
        <div className="grid">
          <span className="text-xs font-semibold">G24/7 Support</span>
          <span className="text-xs">support gift service</span>
        </div>
      </div>
    </div>
  )
}

export default Offer
