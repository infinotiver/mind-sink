import apiClient from "./apiClient";
// import { useMutation } from "@tanstack/react-query";

export interface Sink {
    _id: string,
    title: string,
    description: string,
    user_id: string,
    created_at: string,
    visibility: string,
    tags: []
  
}

// ALL SINKS

export async function getAllSinks() {
  const res = await apiClient.get(`/sinks`);
  console.log(res.data);
  return res.data;
}

// USER SINKS

export async function getUserSinks(userId: string) {
  const allSinks = await getAllSinks();
  return allSinks.filter((sink: Sink) => sink.user_id === userId);
}

// GET SINK

export async function getSink(sinkId: string) {
  const res = await apiClient.get(`/sinks/${sinkId}`);
  return res.data;
}

// // UPDATE ITEM
// export function useUpdateItem() {
//   return useMutation({
//     mutationFn: async ({ itemId, data }: { itemId: string; data: Item }) => {
//       const res = await apiClient.put(`/items/${itemId}`, data);
//       return res.data;
//     },
//   });
// }

// // DELETE ITEM
// export function useDeleteItem(onSuccess?: () => void) {
//   return useMutation({
//     mutationFn: async (itemId: string) => {
//       await apiClient.delete(`/items/${itemId}`);
//     },
//     onSuccess,
//   });
// }
