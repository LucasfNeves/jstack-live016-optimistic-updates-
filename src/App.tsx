import { Header } from "./ui/components/Header";
import { UsersList } from "./ui/components/UsersList";

export function App() {
  return (
    <div className="max-w-125 mx-auto mt-20">
      <Header />

      <main className="mt-10">
        <UsersList />
      </main>
    </div>
  );
}
