const Banner = () => {
  return (
    <div className="relative h-[300px] mt-4 z-50   rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-44 h-44 bg-white/10 z-10 rounded-full translate-y-[-50%] translate-x-[-50%] "></div>
      <div className="absolute bottom-[-60px] right-0 w-44 h-44 bg-white/10 z-10 rounded-full translate-y-[-50%] translate-x-[-50%] "></div>
      <div className="absolute bottom-0 right-20 w-60 h-60 bg-white/10 z-10 rounded-full translate-y-[-50%] translate-x-[-50%] "></div>

      <div className="bg-[#f88648] h-full p-4 rounded-lg  grid grid-cols-2 justify-center items-center backdrop-blur-[20px]">
        <div className="text-white space-y-3">
          <span className="md:text-sm xs:text-[11px] font-semibold">Quality and Style for Every Room</span>
          <h1 className="md:text-[32px] mb-2 xs:text-lg font-bold text-[#419cb6] ">
          Upgrade Your Space with Our Furniture
          </h1>
          <p className="md:text-xs xs:text-[11px] opacity-80">
          Discover a curated selection of furniture that combines comfort and design. Transform your home with pieces that enhance your living experience. Shop now for the perfect blend of quality and affordability
          </p>
          <button className="mt-4 border border_panner px-4 py-1 rounded">Shop Now</button>
        </div>
        <div className=" flex items-center justify-center">
          <img
            src="https://www.vachhanifurniture.com/wp-content/uploads/2021/10/vachhani_homepage_img.png"
            className=" object-cover object-center z-50"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
// faae26
export default Banner
