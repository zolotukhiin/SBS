import { Exchange } from "../types/exchangeTypes"; // Импортируем тип Exchange
import { api } from "./api";

export const exchangeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create exchange
    createExchange: builder.mutation<
      Exchange,
      Omit<Exchange, 'id'>
    >({
      query: (exchangeData) => ({
        url: '/exchange',
        method: 'POST',
        body: exchangeData,
      })
    }),

    // Update exchange by id
    updateExchange: builder.mutation<
      Exchange,
      { exchangeData: Partial<Exchange>, id: number }
    >({
      query: ({ id, exchangeData }) => ({
        url: `/exchange/${id}`,
        method: 'PUT',
        body: exchangeData,
      })
    }),

    // Delete exchange by ID
    deleteExchange: builder.mutation<
      void,
      number
    >({
      query: (id) => ({
        url: `/exchange/${id}`,
        method: 'DELETE',
      })
    }),

    // Get my created exchanges
    getMyCreatedExchanges: builder.query<
      Exchange[],
      void
    >({
      query: () => ({
        url: '/my-exchanges',
        method: 'GET',
      })
    }),

    // Get exchanges for me
    getExchangesForMe: builder.query<
      Exchange[],
      void
    >({
      query: () => ({
        url: '/exchanges-for-me',
        method: 'GET',
      })
    }),

    // Create decision for exchange
    createSolutionToExchange: builder.mutation<
      Exchange,
      { id: number, decision: { status: 'no answer' | 'completed' | 'rejected' | 'offer expired' } }
    >({
      query: ({ id, decision }) => ({
        url: `/exchange-decide/${id}`,
        method: 'POST',
        body: decision,
      })
    }),
  })
});

export const {
  useCreateExchangeMutation,
  useUpdateExchangeMutation,
  useDeleteExchangeMutation,
  useGetMyCreatedExchangesQuery,
  useGetExchangesForMeQuery,
  useCreateSolutionToExchangeMutation,
} = exchangeApi;

export const {
  endpoints: {
    createExchange,
    updateExchange,
    deleteExchange,
    getMyCreatedExchanges,
    getExchangesForMe,
    createSolutionToExchange,
  }
} = exchangeApi;