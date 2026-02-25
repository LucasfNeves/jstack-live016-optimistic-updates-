import { sleep } from "../lib/utils";
import type { IUser } from "../types/IUser";

type IEditUserDTO = Partial<Omit<IUser, "id">> & { id: string };

export async function editUser({
  id,
  name,
  usersname,
  blocked,
}: IEditUserDTO): Promise<IUser> {
  await sleep(500);

  console.log("Editing user", id, { name, usersname, blocked });
  const response = await fetch(`http://localhost:3001/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      usersname: usersname,
      blocked: blocked,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar usuário");
  }

  const body = await response.json();
  return body as IUser;
}
