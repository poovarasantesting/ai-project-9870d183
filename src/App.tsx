import { UserForm } from "./components/UserForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="min-h-screen bg-background">
      <UserForm />
      <Toaster />
    </main>
  );
}

export default App;