import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apartmentApi = createApi({
    reducerPath: 'apartmentApi',
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
      getApartments: builder.query({
        query: () => `apartments`,
      }),
      getApartmentById: builder.query({
        query: (id) => `apartments/${id}`
      }),
      getApartmentByKeyword: builder.query({
        query: (keyword) => `apartments/search?num=${keyword}`
      }),
      createApartment: builder.mutation({
        query: (data) => ({
            url : "apartments",
            method: "POST",
            body: data
        })
      }),
      updateApartment: builder.mutation({
        query: ({id, ...data}) => ({
            url : `apartments/${id}`,
            method: "PUT",
            body: data
        })
      }),
      deleteApartment: builder.mutation({
        query: (id) => ({
            url: `apartments/${id}`,
            method: "DELETE"
        })
      })
    }),
})

export const { useGetApartmentsQuery, useGetApartmentByIdQuery, useGetApartmentByKeywordQuery, useCreateApartmentMutation, useUpdateApartmentMutation, useDeleteApartmentMutation } = apartmentApi