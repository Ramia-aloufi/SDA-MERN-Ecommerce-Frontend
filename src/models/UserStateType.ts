import User from "./User"

type userState = {
    items: User[]
    users: User[]
    error: null | string
    isLoading: boolean
    isLogedIn: boolean
    userData: User | null
    searchTerm: string
    searchedResult: User[]
    status: string | null
  }

  export default userState