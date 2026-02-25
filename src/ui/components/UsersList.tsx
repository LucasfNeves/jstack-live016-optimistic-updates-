import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/Avatar";
import { Switch } from "./Switch";
import { useUsers } from "@/app/hooks/useUsers";
import { Skeleton } from "./Skeleton";
import { toast } from "sonner";
import { useEditUser } from "@/app/hooks/useEditUser";

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { editUser } = useEditUser();

  const handleBlockedChange = async (id: string, blocked: boolean) => {
    try {
      await editUser({ id, blocked });
      toast.success("Status do usuário atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar status do usuário");
    }
  };

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </>
      )}
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
          <Switch
            checked={user.blocked}
            onCheckedChange={(checked) => handleBlockedChange(user.id, checked)}
          />
        </div>
      ))}
    </div>
  );
}
