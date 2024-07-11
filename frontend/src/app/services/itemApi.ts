import { Item } from "../types/itemTypes";
import { api } from "./api";

export const itemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create item
    createItem: builder.mutation<
      Item,
      Omit<Item, 'id' | 'createdAt' | 'isActive'>  // поля, которые не должны быть переданы при создании
    >({
      query: (itemData) => ({
        url: '/items',
        method: 'POST',
        body: itemData,
      })
    }),

    // Update item by id
    updateItem: builder.mutation<
      Item,
      { itemData: Partial<Item>, id: number }
    >({
      query: ({ id, itemData }) => ({
        url: `/items/${id}`,
        method: 'PUT',
        body: itemData,
      })
    }),

    // Delete item by id
    deleteItem: builder.mutation<
      void,
      number
    >({
      query: (id) => ({
        url: `/items/${id}`,
        method: 'DELETE',
      })
    }),

    // Get my items
    myItems: builder.query<
      Item[],
      void
    >({
      query: () => ({
        url: '/my-items',
        method: 'GET'
      })
    }),

    // Get items by user ID
    otherUserItems: builder.query<
      Item[],
      number
    >({
      query: (userId) => ({
        url: `/items/users/${userId}`,
        method: 'GET',
      })
    }),

    // Get item by ID
    getItemById: builder.query<
      Item,
      number
    >({
      query: (id) => ({
        url: `/items/${id}`,
        method: 'GET',
      })
    }),

    // Get all items (если требуется)
    getAllItems: builder.query<
      Item[],
      void
    >({
      query: () => ({
        url: '/items',
        method: 'GET'
      })
    }),
  })
});

export const {
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useMyItemsQuery,
  useOtherUserItemsQuery,
  useGetItemByIdQuery,
  useLazyGetAllItemsQuery,
  useGetAllItemsQuery,
} = itemApi;

export const {
  endpoints: {
    createItem,
    updateItem,
    deleteItem,
    myItems,
    otherUserItems,
    getItemById,
    getAllItems,
  }
} = itemApi;