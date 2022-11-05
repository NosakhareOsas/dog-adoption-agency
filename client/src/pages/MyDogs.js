import DogCard from "../components/DogCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function MyDogs ({dogs, onDelete, onAdopt, currentUser}){
    const myAdoptedDogs = dogs.filter((dog) => dog.adopted_by === currentUser)
    const displayMyAdoptedDogs = myAdoptedDogs.map((dog) =>
        <Col xs={12} sm={12} md={6} lg={6} xl={4} key={dog.id}> 
            <DogCard key={dog.id} dog = {dog} onDelete = {onDelete} onAdopt={onAdopt} currentUser = {currentUser}/>
        </Col>
        );
    const myDogs = dogs.filter((dog) => dog.user.username === currentUser)
    const displayMyDogs = myDogs.map((dog) =>
        <Col xs={12} sm={12} md={6} lg={6} xl={4} key={dog.id}> 
            <DogCard key={dog.id} dog = {dog} onDelete = {onDelete} onAdopt={onAdopt} currentUser = {currentUser}/>
            </Col>
        );
    return (
        <Container>
            <Row>
                <h3>Dogs I submitted</h3>
                {displayMyDogs}
            </Row>
            <Row>
                <h3>Dogs I Adopted</h3>
                {displayMyAdoptedDogs}
            </Row>
        </Container>
        
    );
}

export default MyDogs;