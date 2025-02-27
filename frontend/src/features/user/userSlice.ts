import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/types/userTypes";
import { userApi } from "../../app/services/userApi";
import { act } from "react";
import { RootState } from "../../app/store";

interface InitialState {
  user: User | null,
  isAuthenticated: boolean,
  users: User[] | null,
  current: User | null,
  token?: string
};

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(userApi.endpoints.getUserInfo.matchFulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.current = action.payload;
      })
      .addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, action) => {
        state.users = action.payload;
      });

  }
});

export const { logout } = slice.actions;
export default slice.reducer;

// selector для выбора значений из state
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated

export const selectCurrentUser = (state: RootState) =>
  state.user.current

export const selectUser = (userId: number) => (state: RootState): User | undefined => {

  console.log('inselect', state.user.user);
  return state.user.users ? state.user.users.find(user => user.id === userId) : undefined;
};