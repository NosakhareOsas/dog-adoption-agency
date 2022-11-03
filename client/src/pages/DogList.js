import DogCard from "../components/DogCard";

function DogList ({dogs, onDelete}){
    
    return (
        <>
            <h3>Dog list</h3>
            {dogs.map((dog) => <DogCard key={dog.id} dog = {dog} onDelete = {onDelete}/>)}
        </>
        
    );
}

export default DogList;