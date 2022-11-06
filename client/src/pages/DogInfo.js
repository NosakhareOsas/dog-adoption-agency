import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

function DogInfo(){
    const [dog, setDog] = useState({})
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const {name, breed, gender, image_url, age, size} = dog;
    const {username, firstname, surname, bio} = user;
    const params = useParams();
    const id = params.id;
    const imgStyle = {
        boxShadow: '1px 2px 9px #282c34',
        margin: '2em',
        padding: '1em',
      };
    const divStyle = {
        boxShadow: '1px 2px 4px #282c34',
        margin: '2em',
        padding: '1em'
    };

    useEffect(()=>{
        fetch(`api/dogs/${id}`).then((r)=>{
            if(r.ok){
                r.json().then((dog)=> {
                    setDog(dog)
                    setUser(dog.user)});
            }else{
                r.json().then((err) => setErrors(err.errors));
            }})
    }, [])

    return(
        <Container>
            {errors[0] !== undefined ? <>{errors.map((err) => (<h2 key={err}>{err}</h2>))}</> : 
                <Row>
                    <Col>
                        <Image src={image_url} alt={name}  width='450' rounded="true" fluid="true" style={imgStyle}/>
                    </Col>
                    <Col style={divStyle}>
                        <h1 style={{fontWeight: 700}}>{name}</h1>
                        <Row>
                            <Col><h4> Breed</h4><p>{breed}</p></Col>
                            <Col><h4>Gender</h4><p>{gender}</p></Col>
                        </Row>
                        <Row>
                            <Col><h4>Age</h4><p>{age}</p></Col>
                            <Col><h4>Size</h4><p>{size}</p></Col>
                        </Row>
                        <h1 style={{fontWeight: 700}}>Submitted By</h1>
                        <Row>
                            <Col><h4> Surname</h4><p>{surname}</p></Col>
                            <Col><h4>First name</h4><p>{firstname}</p></Col>
                        </Row>
                        <Row>
                            <Col><h4>Username</h4><p>{username}</p></Col>
                        </Row>
                        <Row>
                            <Col><h4>Bio</h4><p>{bio}</p></Col>
                        </Row>
                    </Col>
                </Row>}
            </Container>
    );
}

export default DogInfo;