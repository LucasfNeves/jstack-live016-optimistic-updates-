import { sleep } from "../lib/utils";
import type { IUser } from "../types/IUser";

export async function listUsers(): Promise<IUser[]> {
  await sleep(500);
  const response = await fetch("http://localhost:3001/users");

  const body = await response.json();

  return body as IUser[];
}
