import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fileUploadApi = createApi({
    reducerPath: 'fileUploadApi',
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
      downloadFile: builder.mutation({
        query: (data) => ({
            url : "file/download",
            method: "GET",
            body: data
        })
      }),
      createUpload: builder.mutation({
        query: (data) => ({
            url : "file/upload",
            method: "POST",
            body: data
        })
      }),
      deleteFile: builder.mutation({
        query: (data) => ({
            url: `file/delete`,
            method: "DELETE",
            body: data
        })
      })
    }),
})

export const { useDownloadFileMutation, useCreateUploadMutation, useDeleteFileMutation } = fileUploadApi