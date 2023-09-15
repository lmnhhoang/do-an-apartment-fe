import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const personApi = createApi({
    reducerPath: 'personApi',
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
      getActivePerson: builder.query({
        query: (page) => `person?page=${page}`,
      }),
      getNonActiveOrByApartmentIdPerson: builder.query({
        query: (id) => `person/nonactive/${id}`,
      }),
      getPersonById: builder.query({
        query: (id) => `person/${id}`,
      }),
      getPersonByKeyword: builder.query({
        query: ({keyword, apartment}) => {
          const searchParams = new URLSearchParams({
            ...(keyword && {keyword}),
            ...(apartment && {apartment})
          });
          const url = `person/search?${searchParams.toString()}`;
          return {url};
        }
      }),
      addPerson: builder.mutation({
        query: (data) => ({
            url : `person`,
            method: "POST",
            body: data
        })
      }),
      updatePerson: builder.mutation({
        query: ({id, ...data}) => ({
            url : `person/${id}`,
            method: "PUT",
            body: data
        })
      }),
    }),
})

export const { useGetActivePersonQuery, useGetNonActiveOrByApartmentIdPersonQuery, useGetPersonByIdQuery, useGetPersonByKeywordQuery, useAddPersonMutation, useUpdatePersonMutation } = personApi