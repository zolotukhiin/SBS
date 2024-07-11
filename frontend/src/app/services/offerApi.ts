import { Offer } from "../types/offerTypes";
import { api } from "./api";

export const offerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create offer
    createOffer: builder.mutation<
      Offer,
      Omit<Offer, 'id'>
    >({
      query: (offerData) => ({
        url: '/offer',
        method: 'POST',
        body: offerData,
      })
    }),

    // Get all offers
    getOffers: builder.query<
      Offer[],
      void
    >({
      query: () => ({
        url: '/offer',
        method: 'GET'
      })
    }),

    // Get offers by user ID
    getOffersByUser: builder.query<
      Offer[],
      number
    >({
      query: (userId) => ({
        url: `/offer/${userId}`,
        method: 'GET',
      })
    }),

    // Get my offers
    myOffers: builder.query<
      Offer[],
      void
    >({
      query: () => ({
        url: '/my-offer',
        method: 'GET'
      })
    }),

    // Update offer by id
    updateOffer: builder.mutation<
      Offer,
      { offerData: Partial<Offer>, id: number }
    >({
      query: ({ id, offerData }) => ({
        url: `/offer/${id}`,
        method: 'PUT',
        body: offerData,
      })
    }),

    // Delete offer by ID
    deleteOffer: builder.mutation<
      void,
      number
    >({
      query: (id) => ({
        url: `/offer/${id}`,
        method: 'DELETE',
      })
    }),
  })
});

export const {
  useCreateOfferMutation,
  useGetOffersQuery,
  useGetOffersByUserQuery,
  useMyOffersQuery,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offerApi;

export const {
  endpoints: {
    createOffer,
    getOffers,
    getOffersByUser,
    myOffers,
    updateOffer,
    deleteOffer,
  }
} = offerApi;