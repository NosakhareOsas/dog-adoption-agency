import React, {useState, useEffect} from "react";
import DogCard from "../components/DogCard";

function DogList (){
    const [dogs, setDogs] = useState([])
    useEffect(()=>{
        fetch("/dogs").then((r)=>{
                if (r.ok){
                    r.json().then((dogs)=>setDogs(dogs));
                }
            }
        );
    }, [])
    return (
        <>
            <h3>Dog list</h3>
            {dogs.map((dog) => <DogCard key={dog.id} dog = {dog}/>)}
        </>
        
    );
}

export default DogList;