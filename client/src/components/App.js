import React, { useEffect, useState } from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import CreateDog from "../pages/CreateDog";
import DogList from "../pages/DogList";
import DogInfo from "../pages/DogInfo";
import MyDogs from "../pages/MyDogs";
import NavBar from "./NavBar";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../style/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });

    fetch("/dogs").then((r)=>{
      if (r.ok){
          r.json().then((dogs)=>setDogs(dogs));
      }
      }
    );
  }, []);

  function handleNewDog(dog){
    setDogs([...dogs, dog])
  }

  function removeDogFromList(deletedDog){
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
    <div className="App">
      <Row className="App-header">
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <NavBar />
        </Col>
      </Row>
      <h1>Hello, {user.username}</h1>
      <button variant="outline" onClick={handleLogoutClick}>
          Logout
      </button>
      
      <Routes>
          <Route path={`dogs`} element={<DogList dogs={dogs} onDelete = {removeDogFromList} onAdopt = {removeDogFromList} currentUser = {user.username}/>}/>
          <Route path={`dogs/mydogs`} element={<MyDogs dogs={dogs} onDelete = {removeDogFromList} onAdopt = {removeDogFromList} currentUser = {user.username}/>}/>
          <Route path={`dogs/new`} element={<CreateDog onDogCreate={handleNewDog}/>}/>
          <Route path={`dogs/:id`} element={<DogInfo/>}/>
      </Routes> 
    </div>
  );
}

export default App;
