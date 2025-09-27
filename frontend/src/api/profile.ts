// src/api/profile.ts
import  apiClient from "./apiClient"; // <-- preconfigured client

export interface UserProfile {
  user_id: string;
  username: string;
  created_at: string;
  avatar_url: string;
  email: string;
  id: string;
}

export async function getUserProfile(userID: string): Promise<UserProfile> {
  const res = await apiClient.get<UserProfile>(`/users/${userID}`);
  return res.data;
}
export async function getMeUserProfile(): Promise<UserProfile> {
  const res = await apiClient.get<UserProfile>(`/me`);
  return res.data;
}
