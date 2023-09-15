import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const newsApi = createApi({
    reducerPath: 'newsApi',
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
      getNews: builder.query({
        query: () => `news`,
      }),
      getNewById: builder.query({
        query: (id) => `news/${id}`
      }),
    //   getNewByKeyword: builder.query({
    //     query: (keyword) => `News/search?num=${keyword}`
    //   }),
      createNew: builder.mutation({
        query: (data) => ({
            url : "news",
            method: "POST",
            body: data
        })
      }),
      updateNew: builder.mutation({
        query: ({id, ...data}) => ({
            url : `news/${id}`,
            method: "PUT",
            body: data
        })
      }),
      deleteNew: builder.mutation({
        query: (id) => ({
            url: `news/${id}`,
            method: "DELETE"
        })
      })
    }),
})

export const { useGetNewsQuery, useGetNewByIdQuery, useCreateNewMutation, useUpdateNewMutation, useDeleteNewMutation } = newsApi