import { useCreateUser } from "@/app/hooks/useCreateUser";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useRef } from "react";
import type React from "react";
import { toast } from "sonner";

export function UserForm() {
  const { createUser, isPending } = useCreateUser();
  const nameRef = useRef<HTMLInputElement>(null);
  const usersnameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submit = async () => {
      try {
        const name = nameRef.current?.value;
        const usersname = usersnameRef.current?.value;

        if (!name || !usersname) return;

        await createUser({ name, usersname, blocked: false });

        toast.success("Usuário criado com sucesso!");

        nameRef.current!.value = "";
        usersnameRef.current!.value = "";
      } catch {
        toast.error("Erro ao criar usuário. Tente novamente.");
      }
    };

    submit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-accent/50 border border-muted p-4 rounded-md"
    >
      <div className="flex flex-col space-y-3 mb-4">
        <Input
          type="text"
          placeholder="Name"
          ref={nameRef}
          disabled={isPending}
        />
        <Input
          type="text"
          placeholder="@ no GitHub"
          ref={usersnameRef}
          disabled={isPending}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        Cadastrar
      </Button>
    </form>
  );
}
