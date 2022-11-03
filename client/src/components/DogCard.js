function DogCard ({dog}){
    const {name, breed, gender, image_url, age, size, user} = dog
    return(
        <>
            <h4>{name} - Submitted by: {user.username}</h4>
        </>
    );
}

export default DogCard;