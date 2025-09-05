import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api";

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
}

interface GetPostProps {
  userId: string;
}

export const usePosts = ({ userId }: GetPostProps) => {
  return useQuery<Post[]>({
    queryKey: ["posts", userId], // cache by page
    queryFn: async () => {
      const res = await apiClient.get("/posts", {
        params: { userId },
      });
      return res.data || [];
    },
    placeholderData: keepPreviousData,
  });
};
