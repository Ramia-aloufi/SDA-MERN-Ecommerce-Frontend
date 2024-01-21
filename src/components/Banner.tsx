const Banner = () => {
  return (
    <div
      className="relative z-10 mt-4 rounded-lg overflow-hidden bg-[url('https://www.spencerinteriors.com/cdn/shop/files/CIERRE-Seed-SlideA_1440x.jpg?v=1698008847')] bg-cover bg-center before:content-['']
    before:absolute before:inset-0 before:bg-[#000] before:opacity-20 before:z-[-10] flex justify-center
    ">
      <div className="text-center space-y-7 w-4/5 sm:w-2/3 py-16 text-white">
        <div className="text-opacity-80">
          <span className="font-semibold text-sm lg:text-lg">Quality and Style for Every Room</span>
          <h1 className="font-extralight lg:text-5xl sm:text-4xl text-3xl mt-2 leading-tight text-white">
            Upgrade Your Space with Our Beautiful Furniture
          </h1>
        </div>
        {/* <p className="text-opacity-80 leading-relaxed md:text-base xs:text-sm">
          Discover a carefully curated selection of furniture that seamlessly combines comfort and
          exquisite design. Transform your home with pieces that elevate your living experience.
          Shop now for the perfect blend of quality and affordability.
        </p> */}
        <button className="btn" style={{ width: '200px' }}> Shop Now </button>
      </div>
    </div>
  )
}
// faae26
export default Banner
