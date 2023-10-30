import React from 'react'

const Banner = () => {
  return (
    <div>
      {/* <div className="bg-gradient-to-bl h-[300px] from-50% from-[#d31027]  to-[#ea384d]"></div> */}
      <div className="bg-[#f88648] h-[300px] rounded-lg mb-4 grid grid-cols-2 justify-center items-center px-4 ">
        <div className="text-white">
          <span className="text-sm font-semibold">Up to #0% off</span>
          <h1 className="text-2xl font-bold">MackbookBro Collection</h1>
          <p className="text-xs opacity-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos dicta velit nam,
            corporis fugiat voluptatibus!
          </p>
          <button className="mt-4 border border-white px-4 py-1 rounded">Shop Now</button>
        </div>
        <img
          src="https://www.pngall.com/wp-content/uploads/15/Apple-Watch-PNG-Images-HD.png"
          className="w-[300px] h-[300px]"
          alt=""
        />
      </div>
    </div>
  )
}

export default Banner
