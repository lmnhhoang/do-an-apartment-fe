import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://do-an-aws.ap-southeast-2.elasticbeanstalk.com/' }),
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
            url: "login",
            method: "POST",
            body: data
        }),
      }),
    }),
})

export const { useLoginMutation } = authApi