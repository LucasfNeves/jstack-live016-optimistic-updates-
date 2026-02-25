import { Header } from "./ui/components/Header";
import { UserForm } from "./ui/components/UserForm";
import { UsersList } from "./ui/components/UsersList";
import { queryClient } from "./app/lib/queryClient";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./ui/components/Sonner";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="max-w-125 mx-auto mt-20">
          <Header />

          <main className="mt-10 space-y-3">
            <UserForm />
            <UsersList />
          </main>
        </div>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
