import { sleep } from "../lib/utils";
import type { IUser } from "../types/IUser";

type ICreateUserDTO = Omit<IUser, "id">;

export async function createUser({
  name,
  usersname,
  blocked,
}: ICreateUserDTO): Promise<IUser> {
  await sleep(5000);
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
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
    throw new Error("Erro ao criar usuário");
  }

  const body = await response.json();
  return body as IUser;
}
