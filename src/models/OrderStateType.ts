import Order from "./Order"

type OrderState = {
    items: Order[]
    orders: Order[]
    userOrders: Order[]
    error: null | string
    status: null | string
    isLoading: boolean
    searchTerm: string
    searchedResult: Order[]
  }

export default OrderState