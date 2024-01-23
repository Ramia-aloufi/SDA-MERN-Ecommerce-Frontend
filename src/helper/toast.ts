import { toast } from 'react-toastify'

import { AppDispatch } from '../redux/store'
import { clearError } from '../redux/slices/products/productSlice'

const showToast = (message: string, isSuccess: boolean, dispatch: AppDispatch | null) => {
  if (isSuccess) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    })
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      onClose: () => {
        if (dispatch) {
          dispatch(clearError())
        }
      }
    })
  }
}

export default showToast
