import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react'
function DogInfo(){
    const [dog, setDog] = useState({})
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const {name, breed, gender, image_url, age, size} = dog;
    const {username} = user;
    
    
    const params = useParams();
    const id = params.id;

    useEffect(()=>{
        fetch(`/dogs/${id}`).then((r)=>{
            if(r.ok){
                r.json().then((dog)=> {
                    setDog(dog)
                    setUser(dog.user)});
            }else{
                r.json().then((err) => setErrors(err.errors));
            }})
    }, [])
    return(
        <>
            <h3>{name} - {username}</h3>
            {errors.map((err) => <h5 key={err}>{err}</h5>)}
        </>
    );
}

export default DogInfo;