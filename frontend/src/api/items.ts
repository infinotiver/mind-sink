import apiClient from "./apiClient";
export interface Item {
  id: string;
  sink_id: string;
  content: string;
  type: string;
}
export async function getUserItems(userId: string) {
  const res = await apiClient.get(`/items/user/?auth_user_id=${userId}`);
  console.log(res.data);
  return res.data;
}
