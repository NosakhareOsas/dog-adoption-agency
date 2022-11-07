import React, { useEffect, useState } from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import CreateDog from "../pages/CreateDog";
import DogList from "../pages/DogList";
import DogInfo from "../pages/DogInfo";
import MyDogs from "../pages/MyDogs";
import NavBar from "./NavBar";
import { Button, Row, Col } from 'react-bootstrap';
import '../style/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    // auto-login
    fetch("api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }});
  }, []);

  useEffect(()=>{
    //load dogs
    fetch("api/dogs").then((r)=>{
      if (r.ok){
          r.json().then((dogs)=>setDogs(dogs));
      }});
  }, [user]);

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
    fetch("api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }


  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <Row className="App-header">
        <Col xs={12} sm={12} md={12} lg={8} xl={9}>
          <NavBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={2} xl={2}>
          <h5>Hello, {user.username}</h5>
        </Col>
        <Col xs={12} sm={12} md={12} lg={1} xl={1}>
          <Button variant="outline-dark" onClick={handleLogoutClick}>
              Logout
          </Button>
        </Col>
      </Row>
      
      
      <Routes>
          <Route path={`/`} element={<DogList dogs={dogs} onDelete = {removeDogFromList} onAdopt = {removeDogFromList} currentUser = {user.username}/>}/>
          <Route path={`mydogs`} element={<MyDogs dogs={dogs} onDelete = {removeDogFromList} onAdopt = {removeDogFromList} currentUser = {user.username}/>}/>
          <Route path={`new`} element={<CreateDog onDogCreate={handleNewDog}/>}/>
          <Route path={`:id`} element={<DogInfo/>}/>
      </Routes> 
    </div>
  );
}

export default App;
