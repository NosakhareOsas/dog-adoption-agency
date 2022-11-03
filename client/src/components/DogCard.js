function DogCard ({dog}){
    const {name, breed, gender, image_url, age, size, user} = dog
    const {username} = user
    return(
        <>
            <h4>{name} - Submitted by: {username}</h4>
        </>
    );
}

export default DogCard;