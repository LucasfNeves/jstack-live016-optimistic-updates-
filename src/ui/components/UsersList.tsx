import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/Avatar";
import { Switch } from "./Switch";

const users = [
  {
    id: Math.random().toString(),
    name: "Lucas Neves",
    usersname: "LucasfNeves",
  },
  {
    id: Math.random().toString(),
    name: "Lucas Neves",
    usersname: "LucasfNeves",
  },
  {
    id: Math.random().toString(),
    name: "Lucas Neves",
    usersname: "LucasfNeves",
  },
];

export function UsersList() {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="border p-4 rounded-md flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={`https://github.com/${user.usersname}.png`}
                alt={user.name}
              />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <strong className="text-lg block leading-4">{user.name}</strong>
              <small className="text-muted-foreground">@{user.usersname}</small>
            </div>
          </div>
          <Switch />
        </div>
      ))}
    </div>
  );
}
