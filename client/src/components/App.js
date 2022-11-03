import React, { useEffect, useState } from "react";
import {Route, Routes, useMatch} from "react-router-dom";
import Login from "../pages/Login";
import CreateDog from "../pages/CreateDog";
import DogList from "../pages/DogList";
import DogInfo from "../pages/DogInfo";

function App() {
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([])

  const match = useMatch({
    path: "/*",
    end: true, 
    caseSensitive: true 
  });
  console.log(match.pathname, match.pathnameBase, match.params['*'])

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  //get all dogs
  useEffect(()=>{
    fetch("/dogs").then((r)=>{
            if (r.ok){
                r.json().then((dogs)=>setDogs(dogs));
            }
        }
    );
  }, [])

  function handleNewDog(dog){
    setDogs([...dogs, dog])
  }

  function handleDogDelete(deletedDog){
    const updatedDogList = dogs.filter((dog) => dog.id.toString() !== deletedDog.id.toString())
    console.log(updatedDogList)
    setDogs(updatedDogList)
  }

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
      
      
      <CreateDog onDogCreate={handleNewDog}/>
      <Routes>
          <Route path={`dogs`} element={<DogList dogs={dogs} onDelete = {handleDogDelete}/>}/>
          <Route path={`dogs/:id`} element={<DogInfo />} />
      </Routes> 
    </>
  );
}

export default App;
