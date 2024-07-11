import { User } from "../types/userTypes";
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // login
    login: builder.mutation<
      { token: string },
      { identifier: string, password: string }
    >({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData
      })
    }),

    // registration - create user
    registration: builder.mutation<
      { firstname: string, lastname: string, username: string, number: string, password: string },
      void
    >({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData
      })
    }),

    // get all users
    getUsers: builder.query<
      User[],
      void
    >({
      query: () => ({
        url: '/users',
        method: 'GET'
      })
    }),

    // get user by id
    getUserById: builder.query<
      User,
      string
    >({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      })
    }),

    // update user by id
    updateUser: builder.mutation<
      User,
      { userData: FormData, id: string }
    >({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      })
    }),

    // delete user by id
    deleteUser: builder.mutation<
      string,
      void
    >({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      })
    }),

    // logout
    logoutUser: builder.mutation<
      void,
      void
    >({
      query: () => ({
        url: '/logout',
        method: 'POST'
      })
    }),

    // get user info
    getUserInfo: builder.query<
      User,
      void
    >({
      query: () => ({
        url: '/me',
        method: 'GET',
      })
    }),
  })
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetUsersQuery,
  useLazyGetUserInfoQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLogoutUserMutation,
  useGetUserInfoQuery
} = userApi;

export const {
  endpoints: {
    login,
    registration,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    logoutUser,
    getUserInfo,
  }
} = userApi;
