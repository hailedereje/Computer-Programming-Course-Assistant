import {create} from "zustand";

interface PageState{
    isLoading: boolean,
    setLoading: () => void
}

interface ProfilePage{page:string,setPage: ({page}:{page: string})=>void}

export const UsePageState = create<PageState>()((set) => ({
    isLoading: false,
    setLoading:() => set((state) =>({isLoading:!state.isLoading}))
}))

type Page = {
    page: string
  }
  
  type Action = {
    updatePage: (firstName: Page['page']) => void
  }
  
  // Create your store, which includes both state and (optionally) actions
  export const useProfilePageState = create<Page & Action>((set) => ({
    page: 'profile',
    updatePage: (page) => set(() => ({ page: page })),
  }))