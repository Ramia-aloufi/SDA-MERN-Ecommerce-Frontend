const Banner = () => {
  return (
    <div>
      {/* <div className="bg-gradient-to-bl h-[300px] from-50% from-[#d31027]  to-[#ea384d]"></div> */}
      <div className="bg-[#f88648] mt-4 h-[300px] rounded-lg  grid grid-cols-2 justify-center items-center px-4 ">
        <div className="text-white">
          <span className="md:text-sm xs:text-[11px] font-semibold">Up to #0% off</span>
          <h1 className="md:text-[32px] mb-2 xs:text-lg font-bold">Mackbook Pro M3 Collection</h1>
          <p className="md:text-xs xs:text-[11px] opacity-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dicta velit nam,
            corporis fugiat voluptatibus!
          </p>
          <button className="mt-4 border border-white px-4 py-1 rounded">Shop Now</button>
        </div>
        <div className=" flex items-center justify-center">
          <img
            src="https://www.humac.dk/c/NPI/2023/MacBook%20Pro%20M3/DKDA_MacBook_Pro_M3_Q124_Web_Marketing_Page_HTML/images/apps_small.png?1697864086950"
            className=" object-cover object-center"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
