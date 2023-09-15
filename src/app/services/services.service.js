import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const servicesApi = createApi({
    reducerPath: 'servicesApi',
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
      getServices: builder.query({
        query: () => `services`,
      }),
      getServiceById: builder.query({
        query: (id) => `services/${id}`
      }),
    //   getServiceByKeyword: builder.query({
    //     query: (keyword) => `services/search?num=${keyword}`
    //   }),
      createService: builder.mutation({
        query: (data) => ({
            url : "services",
            method: "POST",
            body: data
        })
      }),
      updateService: builder.mutation({
        query: ({id, ...data}) => ({
            url : `services/${id}`,
            method: "PUT",
            body: data
        })
      }),
      deleteService: builder.mutation({
        query: (id) => ({
            url: `services/${id}`,
            method: "DELETE"
        })
      })
    }),
})

export const { useGetServicesQuery, useGetServiceByIdQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation } = servicesApi