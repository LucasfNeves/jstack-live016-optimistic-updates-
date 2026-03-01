import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../services/editUser";
import { USERS_QUERY_KEY } from "./useUsers";
import type { IUser } from "../types/IUser";
import { toast } from "sonner";

export function useEditUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editUser,
    onMutate: (variables) => {
      const snapShotUser = queryClient.getQueryData<IUser[]>(USERS_QUERY_KEY);
      queryClient.setQueryData(USERS_QUERY_KEY, (old: IUser[] | undefined) => {
        if (!old) return [];
        return old.map((user) => {
          if (user.id === variables.id) {
            return {
              ...user,
              ...variables,
            };
          }
          return user;
        });
      });

      return {
        snapShotUser,
      };
    },

    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      queryClient.setQueryData(USERS_QUERY_KEY, context?.snapShotUser);

      toast.error("Erro ao atualizar usuário. Tente novamente.");
    },
  });

  return {
    editUser: mutateAsync,
    isPending,
  };
}
