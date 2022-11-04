import { Link } from "react-router-dom";

function DogCard ({dog, onDelete, onAdopt}){
    const {id, name, breed, gender, image_url, age, size, user} = dog
    const {username} = user
    
    function handleDelete(){
        fetch(`/dogs/${id}`, {method: "DELETE"})
        .then((r)=>r.json())
        .then((data)=>onDelete(data))
    }
    function handleUpdate(){
        fetch(`/dogs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({is_adopted: true}),
        })
        .then((r)=>r.json())
        .then((dog)=>onAdopt(dog))
    }
    return(
        <>
            <Link key={id} to={`/dogs/${id}`}>
                <h4>{name} - Submitted by: {username}</h4>
            </Link>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Adopt</button>
            
        </>
    );
}

export default DogCard;