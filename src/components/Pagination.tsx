import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex justify-center items-center p-4 space-x-4 my-4">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 hover:text-white border rounded ${
            currentPage === page
              ? ' border-[#f88648] text-[#f88648] bg-transparent'
              : ' text-gray-500 border-gray-500'
          }  hover:bg-[#f88648] hover:border-transparent`}>
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
