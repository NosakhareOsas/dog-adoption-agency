import DogCard from "../components/DogCard";

function MyDogs ({dogs, onDelete, onAdopt, currentUser}){
    const myAdoptedDogs = dogs.filter((dog) => dog.adopted_by === currentUser)
    const myDogs = dogs.filter((dog) => dog.user.username === currentUser)
    return (
        <>
            <h3>Dogs I submitted</h3>
            {myDogs.map((dog) => <DogCard key={dog.id} dog = {dog} onDelete = {onDelete} onAdopt={onAdopt} currentUser = {currentUser}/>)}
            <h3>Dogs I Adopted</h3>
            {myAdoptedDogs.map((dog) => <DogCard key={dog.id} dog = {dog} onDelete = {onDelete} onAdopt={onAdopt} currentUser = {currentUser}/>)}
        </>
        
    );
}

export default MyDogs;