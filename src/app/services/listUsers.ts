import type { IUser } from "../types/IUser";

export async function listUsers(): Promise<IUser[]> {
  const response = await fetch("http://localhost:3001/api/users");

  const body = await response.json();

  return body as IUser[];
}
