import apiClient from './apiClient';
// import { useMutation } from "@tanstack/react-query";

export interface Sink {
  _id: string;
  title: string;
  description: string;
  user_id: string;
  created_at: string;
  visibility: string;
  tags: string[];
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
// CREATE SINK

export async function createSink(newSink: Omit<Sink, '_id' | 'created_at'>) {
  const res = await apiClient.post(`/sinks`, newSink);
  return res.data;
}
// DELETE SINK

export async function deleteSink(sinkId: string) {
  const res = await apiClient.delete(`/sinks/${sinkId}`);
  return res.data;
}

// UPDATE SINK
export async function updateSink(
  sinkId: string,
  update: Partial<Omit<Sink, '_id' | 'created_at' | 'user_id'>>
) {
  const res = await apiClient.put(`/sinks/${sinkId}`, update);
  return res.data;
}
