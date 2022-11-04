import DogCard from "../components/DogCard";

function MyDogs ({dogs, onDelete, onAdopt, user}){
    
    const nonAdoptedDog = dogs.filter((dog) => dog.is_adopted === true && dog.user.username === user)
    return (
        <>
            <h3>My Dogs</h3>
            {nonAdoptedDog.map((dog) => <DogCard key={dog.id} dog = {dog} onDelete = {onDelete} onAdopt={onAdopt}/>)}
        </>
        
    );
}

export default MyDogs;