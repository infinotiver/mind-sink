import apiClient from "./apiClient";
import { useMutation } from "@tanstack/react-query";

export interface Item {
  _id: string;
  sink_id: string;
  content: string;
  type: string;
  tags: string[];
}

// ALL ITEMS BY USER

export async function getUserItems(userId: string) {
  const res = await apiClient.get(`/items/user/?auth_user_id=${userId}`);
  console.log(res.data);
  return res.data;
}
//  ITEMS BY SINK

export async function getItemsBySink(sinkId: string) {
  const res = await apiClient.get(`/items/sink/${sinkId}`);
  console.log(res.data);
  return res.data;
}

// GET ITEM

export async function getItem(itemId: string) {
  const res = await apiClient.get(`/items/item/${itemId}`);
  return res.data;
}

// UPDATE ITEM
export function useUpdateItem() {
  return useMutation({
    mutationFn: async ({ itemId, data }: { itemId: string; data: Item }) => {
      const res = await apiClient.put(`/items/${itemId}`, data);
      return res.data;
    },
  });
}

// DELETE ITEM
export function useDeleteItem(onSuccess?: () => void) {
  return useMutation({
    mutationFn: async (itemId: string) => {
      await apiClient.delete(`/items/${itemId}`);
    },
    onSuccess,
  });
}
