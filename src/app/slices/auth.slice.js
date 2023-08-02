import { createSlice } from '@reduxjs/toolkit'
import { getDatatFromLocalStorage, setDataToLocalStorage } from '../../utils/localStorageUtils';
import { authApi } from '../services/auth.service';

const defaultState = {
    auth : null,
    token : null,
    isAuthenticated : false
}

const initialState = getDatatFromLocalStorage("authUser") ? getDatatFromLocalStorage("authUser") : defaultState

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      setDataToLocalStorage("authUser", defaultState)
      return defaultState;
    }
  },
  extraReducers : (builder) => {
    builder.addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action) => {
            state.auth = action.payload.auth
            state.token = action.payload.token
            state.isAuthenticated = action.payload.isAuthenticated
            // Lưu vào local storage
            setDataToLocalStorage("authUser", state)
        }
    )
  }
});

export const {logout} = authSlice.actions

export default authSlice.reducer