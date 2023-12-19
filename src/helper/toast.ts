import { toast } from 'react-toastify'

export const showToast = (message: string, isSuccess: boolean) => {
  if (isSuccess) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000 // Auto close the toast after 3000 milliseconds (3 seconds)
    })
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000 // Auto close the toast after 3000 milliseconds (3 seconds)
    })
  }
}
