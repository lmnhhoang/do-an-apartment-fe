import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const billApi = createApi({
    reducerPath: 'billApi',
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
      getBills: builder.query({
        query: () => `bills`,
      }),
      getBillById: builder.query({
        query: (id) => `bills/${id}`,
      }),
      getBillsByApartmentId: builder.query({
        query: (id) => `bills/apartment/${id}`,
      }),
      addBill: builder.mutation({
        query: (data) => ({
            url : `bills`,
            method: "POST",
            body: data
        })
      }),
      updateBill: builder.mutation({
        query: ({id, ...data}) => ({
            url : `bills/${id}`,
            method: "PUT",
            body: data
        })
      }),
      deleteBill: builder.mutation({
        query: (id) => ({
            url: `bills/${id}`,
            method: "DELETE"
        })
      })
    }),
})

export const { useGetBillsQuery, useGetBillByIdQuery, useGetBillsByApartmentIdQuery, useAddBillMutation, useUpdateBillMutation, useDeleteBillMutation } = billApi