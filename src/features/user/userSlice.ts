import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userAPI } from "../../apis/user.api"


export const fetchUserById = createAsyncThunk(
    'users/getByIdUser',
    async ( thunkAPI) => {
      const response = await userAPI.getByIdUser()
      return response.data.data
    },
  )

  interface UsersState {
    user: any
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  }

  const initialState = {
    user: {},
    loading: 'idle',
  } satisfies UsersState as UsersState

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      
      builder.addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = 'succeeded';
      })
     
    },
  })

  export const {  } = userSlice.actions;
  export const userReducer = userSlice.reducer;