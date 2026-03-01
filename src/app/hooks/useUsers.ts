import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../services/listUsers";
import type { WithStatus } from "../types/utils";
import type { IUser } from "../types/IUser";

export const USERS_QUERY_KEY = ["users"];

export type UsersQueryData = WithStatus<IUser>[];

export function useUsers() {
  const { data, isLoading } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const response = await listUsers();

      return response as UsersQueryData;
    },
    staleTime: Infinity,
  });

  return {
    users: data ?? [],
    isLoading,
  };
}
