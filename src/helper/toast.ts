import { toast } from 'react-toastify'
import { AppDispatch } from '../redux/store'
import { clearError } from '../redux/slices/products/productSlice'

export const showToast = (message: string, isSuccess: boolean, dispatch: AppDispatch | null) => {
  if (isSuccess) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000 // Auto close the toast after 3000 milliseconds (3 seconds)
    })
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Auto close the toast after 3000 milliseconds (3 seconds)
      onClose: () => {
        //dispatch here
        if (dispatch) {
          dispatch(clearError())
        }
        // You can add your custom close functionality here
      }
    })
  }
}
