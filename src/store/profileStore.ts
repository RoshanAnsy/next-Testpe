import {create} from "zustand"


interface profileStoreState{
    profileDetails:unknown,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    setProfileDetails:Function
}


const useProfileStore = create<profileStoreState>((set) => ({
    profileDetails: null,
    setProfileDetails: (details:unknown) => set({ profileDetails: details }),
}))

export default useProfileStore;