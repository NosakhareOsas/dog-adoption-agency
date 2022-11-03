import React, {useState, useEffect} from "react";

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
            {dogs.map((dog) => <h4 key={dog.id}>{dog.name}</h4>)}
        </>
        
    );
}

export default DogList;