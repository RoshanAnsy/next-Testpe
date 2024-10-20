import {create} from "zustand"

interface AuthStoreState{
    authToken:string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setAuthToken:Function
}

const useAuthStore=create<AuthStoreState>((set)=>(
    {
        authToken:"",
        setAuthToken:(token:string)=>set({authToken:token})
    }
))

export default useAuthStore;