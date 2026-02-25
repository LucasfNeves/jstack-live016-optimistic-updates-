import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { queryClient } from "../lib/queryClient";

export function useCreateUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    createUser: mutateAsync,
    isPending,
  };
}
