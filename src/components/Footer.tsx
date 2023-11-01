export const Footer = () => {
  return (
    <footer className="bg-[#434343] text-white p-4 w-screen text-center flex justify-between text-sm">
      <div className="text-center md:text-right">
        <a href="/terms" className="text-sm mr-4">
          Terms of Service
        </a>
        <a href="/privacy" className="text-sm mr-4">
          Privacy Policy
        </a>
        <a href="/about" className="text-sm">
          About Us
        </a>
        {/* Add other relevant links */}
      </div>
      <p>© 2023 Ramia Aloufi. All rights reserved.</p>
    </footer>
  )
}
