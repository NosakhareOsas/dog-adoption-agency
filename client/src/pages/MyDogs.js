import DogCard from "../components/DogCard";

function MyDogs ({dogs, onDelete, onAdopt}){
    console.log("retytt",dogs)
    const nonAdoptedDog = dogs.filter((dog) => dog.is_adopted === true)
    return (
        <>
            <h3>My Dogs</h3>
            {nonAdoptedDog.map((dog) => <DogCard key={dog.id} dog = {dog} onDelete = {onDelete} onAdopt={onAdopt}/>)}
        </>
        
    );
}

export default MyDogs;