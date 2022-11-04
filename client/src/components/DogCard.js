import { Link } from "react-router-dom";

function DogCard ({dog, onDelete, onAdopt, currentUser}){
    const {id, name, breed, gender, image_url, age, size, user, is_adopted} = dog
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
            body: JSON.stringify({is_adopted: true, adopted_by: currentUser}),
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
            {is_adopted || username === currentUser ? null : <button onClick={handleUpdate}>Adopt</button>}
            
            
        </>
    );
}

export default DogCard;