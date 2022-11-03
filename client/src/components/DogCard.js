import { Link } from "react-router-dom";

function DogCard ({dog, onDelete}){
    const {id, name, breed, gender, image_url, age, size, user} = dog
    const {username} = user
    function handleDelete(){
        fetch(`/dogs/${id}`, {method: "DELETE"})
        .then((r)=>r.json())
        .then((data)=>onDelete(data))
    }
    return(
        <>
            <Link key={id} to={`/dogs/${id}`}>
                <h4>{name} - Submitted by: {username}</h4>
            </Link>
            <button onClick={handleDelete}>Delete</button>
            
        </>
    );
}

export default DogCard;