import {create} from "zustand";

interface PageState{
    isLoading: boolean,
    setLoading: () => void
}

export const UsePageState = create<PageState>()((set) => ({
    isLoading: false,
    setLoading:() => set((state) =>({isLoading:!state.isLoading}))
}))