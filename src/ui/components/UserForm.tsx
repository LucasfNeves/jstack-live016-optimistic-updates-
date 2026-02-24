import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export function UserForm() {
  return (
    <form className="bg-accent/50 border border-muted p-4 rounded-md">
      <div className="flex flex-col space-y-3 mb-4">
        <Input placeholder="Name" />
        <Input placeholder="@ no GitHub" />
      </div>
      <Button className="w-full">Cadastrar</Button>
    </form>
  );
}
