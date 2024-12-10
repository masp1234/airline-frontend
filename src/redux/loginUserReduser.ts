import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginUserStore {
    role: string | null;
    email: string | null;
  }

  interface LoginUserData {
    data: LoginUserStore | null,
  }

  const initialState: LoginUserData = {
    data: null,
  }

  export const loginUserDataSlice = createSlice({
    name: 'loginUserData',
    initialState,
    reducers: {

        setLoginUser: (state, action: PayloadAction<LoginUserStore | null>) => {
            state.data = action.payload;
        },
        clearLoginUser: (state) =>{
            state.data = {} as LoginUserStore;
        }
  
        
    },
  });

  export const { setLoginUser, clearLoginUser} = loginUserDataSlice.actions;

  export default loginUserDataSlice.reducer