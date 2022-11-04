import DogCard from "../components/DogCard";

function DogList ({dogs, onDelete, onAdopt, currentUser}){
    const nonAdoptedDog = dogs.filter((dog) => dog.is_adopted === false)
    return (
        <>
            <h3>Dog list</h3>
            {nonAdoptedDog.map((dog) => <DogCard key={dog.id} dog = {dog} onDelete = {onDelete} onAdopt={onAdopt} currentUser = {currentUser}/>)}
        </>
        
    );
}

export default DogList;