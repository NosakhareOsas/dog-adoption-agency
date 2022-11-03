import React, { useEffect, useState } from "react";
import Login from "../pages/Login";
import CreateDog from "../pages/CreateDog";
import DogList from "../pages/DogList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  //logout
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <h1>Hello, {user.username}</h1>
      <button variant="outline" onClick={handleLogoutClick}>
          Logout
      </button>
      <DogList />
      <CreateDog />
    </>
  );
}

export default App;
