import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Borrow, BorrowSummary } from "../../types";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-6h6r.onrender.com/api",
  }),
  tagTypes: ["Borrow", "Book"],
  endpoints: (builder) => ({
    createBorrow: builder.mutation<
      { success: boolean; data: Borrow },
      { book: string; quantity: number; dueDate: string }
    >({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Borrow", "Book"],
    }),

    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => "/borrow",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: BorrowSummary[];
      }) => response.data,
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;
