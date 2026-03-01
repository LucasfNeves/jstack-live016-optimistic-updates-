export type WithStatus<T> = T & {
  status: "pending" | "success" | "error";
};
