import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const devicesApi = createApi({
    reducerPath: 'devicesApi',
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
      getDevices: builder.query({
        query: () => `devices`,
      }),
      getDeviceById: builder.query({
        query: (id) => `devices/${id}`
      }),
    //   getDevicesByKeyword: builder.query({
    //     query: (keyword) => `devices/search?num=${keyword}`
    //   }),
      createDevice: builder.mutation({
        query: (data) => ({
            url : "devices",
            method: "POST",
            body: data
        })
      }),
      updateDevice: builder.mutation({
        query: ({id, ...data}) => ({
            url : `devices/${id}`,
            method: "PUT",
            body: data
        })
      }),
      deleteDevice: builder.mutation({
        query: (id) => ({
            url: `devices/${id}`,
            method: "DELETE"
        })
      })
    }),
})

export const { useGetDevicesQuery, useGetDeviceByIdQuery, useCreateDeviceMutation, useUpdateDeviceMutation, useDeleteDeviceMutation } = devicesApi