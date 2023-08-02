import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const feeApi = createApi({
    reducerPath: 'feeApi',
    baseQuery: fetchBaseQuery({ 
      baseUrl: 'http://do-an-aws.ap-southeast-2.elasticbeanstalk.com/api/',
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
    
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
    
        return headers
      }, }),
    endpoints: (builder) => ({
      getFees: builder.query({
        query: () => `fees`,
      }),
      getFeeById: builder.query({
        query: (id) => `fees/${id}`,
      }),
      updateFee: builder.mutation({
        query: ({id, ...data}) => ({
            url : `fees/${id}`,
            method: "PUT",
            body: data
        })
      }),
    }),
})

export const { useGetFeesQuery, useGetFeeByIdQuery, useUpdateFeeMutation } = feeApi