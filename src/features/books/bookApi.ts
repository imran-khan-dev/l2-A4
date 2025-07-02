import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "../../types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-6h6r.onrender.com/api",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<{ data: Book[] }, void>({
      query: () => "/books",
      providesTags: ["Book"],
    }),
    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
    }),
    createBook: builder.mutation<void, Partial<Book>>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<void, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
