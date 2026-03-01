import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/Avatar";
import { Switch } from "./Switch";
import { useUsers } from "@/app/hooks/useUsers";
import { toast } from "sonner";
import { useEditUser } from "@/app/hooks/useEditUser";
import { cn } from "@/app/lib/utils";

export function UsersList() {
  const { users } = useUsers();
  const { editUser } = useEditUser();

  const handleBlockedChange = async (id: string, blocked: boolean) => {
    try {
      await editUser({ id, blocked });
    } catch {
      toast.error("Erro ao atualizar status do usuário");
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className={cn(
            "border p-4 rounded-md flex items-center justify-between",
            user.status === "error" && "border-destructive bg-destructive/10",
            user.status === "pending" && "border-yellow-500 opacity-50",
            user.status === "success" && "border-green-500",
          )}
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
          <Switch
            disabled={user.status === "pending" || user.status === "error"}
            size="sm"
            checked={user.blocked}
            onCheckedChange={(checked) => handleBlockedChange(user.id, checked)}
          />
        </div>
      ))}
    </div>
  );
}
