import { IoRocketOutline, IoGiftOutline, IoCardOutline } from 'react-icons/io5'

const Offer = () => {
  return (
    <div className="flex gap-5 justify-between border p-4 text-gray-500  flex-wrap border-separate">
      <div className="flex items-center  gap-2  ">
        <IoRocketOutline className="text-3xl" />
        <div className="grid">
          <span className="text-xs font-semibold">Free Delivery</span>
          <span className="text-xs">for all order over:$99</span>
        </div>
      </div>
      {/* <div className="flex items-center gap-2 ">
        <IoReturnDownBack className="text-3xl" />
        <div className="grid">
          <span className="text-xs font-semibold">90 days return</span>
          <span className="text-xs">for all order over:$99</span>
        </div>
      </div> */}

      <div className="flex items-center gap-2 ">
        <IoGiftOutline className="text-3xl" />
        <div className="grid">
          <span className="text-xs font-semibold">FREE GIFT PACKAGING</span>
          <span className="text-xs">support gift service</span>
        </div>
      </div>

      <div className="flex items-center gap-2 ">
        <IoCardOutline className="text-3xl" />
        <div className="grid">
          <span className="text-xs font-semibold">GO SEAMLESS WITH APPLE PAY</span>
          <span className="text-xs">support gift service</span>
        </div>
      </div>

      {/* <div className="flex items-center gap-2 ">
        <IoChatboxEllipsesOutline className="text-3xl" />
        <div className="grid">
          <span className="text-xs font-semibold">24/7 Support</span>
          <span className="text-xs">support gift service</span>
        </div>
      </div> */}
    </div>
  )
}

export default Offer
