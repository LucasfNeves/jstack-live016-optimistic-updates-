import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { USERS_QUERY_KEY, type UsersQueryData } from "./useUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onMutate: (variables) => {
      const tempUserId = Math.random().toString(36).substring(2, 9);
      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (old) =>
        old?.concat({
          ...variables,
          id: tempUserId,
          status: "pending" as const,
        }),
      );

      return { tempUserId };
    },

    onSuccess: async (data, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (old) =>
        old?.map((user) =>
          user.id === context.tempUserId
            ? { ...data, status: "success" }
            : user,
        ),
      );
    },

    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      queryClient.setQueryData<UsersQueryData>(USERS_QUERY_KEY, (old) =>
        old?.map((user) =>
          user.id === context?.tempUserId ? { ...user, status: "error" } : user,
        ),
      );
    },
  });

  return {
    createUser: mutateAsync,
    isPending,
  };
}
