import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
      baseUrl: 'https://do-an-aws.ap-southeast-2.elasticbeanstalk.com/api/',
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
    
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
    
        return headers
      }, }),
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => `user`,
      }),
    //   getUserById: builder.query({
    //     query: (id) => `user/${id}`
    //   }),
    //   getUserByKeyword: builder.query({
    //     query: (keyword) => `user/search?num=${keyword}`
    //   }),
      createUser: builder.mutation({
        query: (data) => ({
            url : "user/create",
            method: "POST",
            body: data
        })
      }),
    //   updateUser: builder.mutation({
    //     query: ({id, ...data}) => ({
    //         url : `user/${id}`,
    //         method: "PUT",
    //         body: data
    //     })
    //   }),
      deleteUser: builder.mutation({
        query: (id) => ({
            url: `user/${id}`,
            method: "DELETE"
        })
      })
    }),
})

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation } = userApi