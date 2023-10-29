// src/components/PopupFrame.tsx
// src/App.tsx

type PopupFrameProps = {
  title: string
  content: React.ReactNode
  onClose: () => void
}

const PopupFrame = ({ title, content, onClose }: PopupFrameProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="relative bg-white p-4 rounded shadow-lg">
        <button
          className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}>
          Close
        </button>
        <h2 className="text-2xl font-bold">{title}</h2>
        {content}
      </div>
    </div>
  )
}

export default PopupFrame
