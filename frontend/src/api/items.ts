import apiClient from "./apiClient";
export interface Item {
  _id: string;
  sink_id: string;
  content: string;
  type: string;
  tags: string[]
}

export async function getUserItems(userId: string) {
  const res = await apiClient.get(`/items/user/?auth_user_id=${userId}`);
  console.log(res.data);
  return res.data;
}

export async function getItem(itemId: string) {
  const res = await apiClient.get(`/items/item/${itemId}`);
  return res.data;
}