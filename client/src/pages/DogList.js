import DogCard from "../components/DogCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function DogList ({dogs, onDelete, onAdopt, currentUser}){
    const nonAdoptedDogs = dogs.filter((dog) => dog.is_adopted === false);
    const displayDogs = nonAdoptedDogs.map(dog => 
        <Col xs={12} sm={12} md={6} lg={6} xl={4} key={dog.id}>
            <DogCard key={dog.id} dog = {dog} onDelete = {onDelete} onAdopt={onAdopt} currentUser = {currentUser}/> 
        </Col>
        );
    return (
        <Container>
            <Row>
                {displayDogs}
            </Row>
        </Container>
    );
}

export default DogList;