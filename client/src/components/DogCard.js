import { Link } from "react-router-dom";
import {Button, Card} from 'react-bootstrap';

export function truncate (string = '', limit = 0) {
    if (string.length > 13) {
        return `${string.substring(0, limit)}...`
    } else{
        return string
    }
}

function DogCard ({dog, onDelete, onAdopt, currentUser}){
    const textStyle = { fontSize: 15, color: 'black', fontWeight: 500}
    const titleStyle = {fontSize: 30, color: 'black',  fontWeight: 'bold'}
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
        <Card style={{ width: '100%', margin: '10px', }}>
            <Link key={id} to={`/${id}`}>
                <Card.Img src={image_url} alt={name} style={{height: '15rem'}}/>
                <Card.ImgOverlay >
                    <div style={{background: 'white', opacity: 0.8, padding: '10px'}}>
                        <Card.Title style={titleStyle}>{truncate(name, 12)}</Card.Title>
                        <Card.Text style={textStyle}>Breed: {breed}</Card.Text>
                        <Card.Text style={textStyle}>Gender: {gender}</Card.Text>
                        <Card.Text style={textStyle}>Submitted by: {username}</Card.Text>
                    </div>
                </Card.ImgOverlay>
            </Link>
            {is_adopted || username === currentUser ? <Button variant='outline-dark' onClick={handleDelete}>Delete</Button> : 
                <Button variant='dark' onClick={handleUpdate}>Adopt</Button>}
        </Card>  
    );
}

export default DogCard;