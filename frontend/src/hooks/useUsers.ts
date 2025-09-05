import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  adders: {
    state?: string;
    city?: string;
    street?: string;
    zipcode?: string;
  };
};

type UseUsersProps = {
  pageNumber: number;
  pageSize: number;
};

type UseUserCount = {
  count: number;
};

export const useUsers = ({ pageNumber, pageSize }: UseUsersProps) => {
  return useQuery<User[]>({
    queryKey: ["users", pageNumber, pageSize], // cache by page
    queryFn: async () => {
      const res = await apiClient.get("/users", {
        params: { pageNumber, pageSize },
      });
      return res.data || [];
    },
    placeholderData: keepPreviousData,
  });
};

export const useUsersCount = () => {
  return useQuery<UseUserCount>({
    queryKey: ["users-count"],
    queryFn: async () => {
      const res = await apiClient.get("/users/count");
      return res.data || 0;
    },
    placeholderData: keepPreviousData,
  });
};
