import React from "react";
import { RegistrationForm } from "./components/RegistrationForm";
import { Toaster } from "./components/ui/toast";

function App() {
  return (
    <div className="App">
      <RegistrationForm />
      <Toaster />
    </div>
  );
}

export default App;