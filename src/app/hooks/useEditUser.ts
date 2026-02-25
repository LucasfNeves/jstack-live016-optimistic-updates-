import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { editUser } from "../services/editUser";

export function useEditUser() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    editUser: mutateAsync,
    isPending,
  };
}
