import { Link } from "react-router-dom";

function DogCard ({dog}){
    const {id, name, breed, gender, image_url, age, size, user} = dog
    const {username} = user
    return(
        <>
            <Link key={id} to={`/dogs/${id}`}>
                <h4>{name} - Submitted by: {username}</h4>
            </Link>
            
        </>
    );
}

export default DogCard;