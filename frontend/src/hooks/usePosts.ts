import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "../api";
import toast from "react-hot-toast";

export interface Post {
  id: string;
  user_id: string;
  title: string;
  body?: string;
  created_at?: string;
}

interface GetPostProps {
  userId: string;
}

type NewPost = {
  title: string;
  body: string;
  userId: string;
  createdAt: string;
};

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

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      newPost: NewPost
    ): Promise<{ message: string; postId: string }> => {
      const res = await apiClient.post("/posts", newPost);
      return res.data;
    },
    onSuccess: (data, variables) => {
      toast.success("Post Added!", { id: `added-${data.postId}` });

      queryClient.invalidateQueries({ queryKey: ["posts", variables.userId] });
    },
    onError: (err, postId) => {
      toast.error(err.message, { id: `delete-${postId}` });
    },
  });
};

export const useDeletePost = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string): Promise<{ message: string }> => {
      const res = await apiClient.delete(`/posts/${postId}`);
      return res.data;
    },
    onMutate: async (postId) => {
      toast.loading("Deleting post...", { id: `delete-${postId}` });

      await queryClient.cancelQueries({ queryKey: ["posts", userId] });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts", userId]);

      queryClient.setQueryData<Post[]>(["posts", userId], (old) =>
        old ? old.filter((p) => p.id !== postId) : []
      );

      return { previousPosts, postId };
    },
    onError: (_err, postId, context) => {
      toast.error("Failed to delete post", { id: `delete-${postId}` });

      if (context?.previousPosts) {
        queryClient.setQueryData(["posts", userId], context.previousPosts);
      }
    },
    onSuccess: (_data, postId) => {
      toast.success("Post deleted!", { id: `delete-${postId}` });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
    },
  });
};
