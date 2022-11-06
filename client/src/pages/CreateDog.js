import React, { useState } from "react";
import {Button, Card} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function CreateDog({onDogCreate}){
    let baseData = {
        name: "",
        gender: "",
        breed: "",
        image_url: "",
        size: "",
        age: 0
    }
    const [formData, setFormData] = useState(baseData)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData)
        setIsLoading(true);
        fetch("/dogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((dog) => {
                onDogCreate(dog)
                setErrors([])});
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
    return(
        <Container>
            <h1 style={{ margin: '80px' }}>SUBMIT YOUR DOG FOR ADOPTION, TODAY!!!</h1>
            <Card style={{ padding: '25px' }}>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="formBasicName"> 
                            <FloatingLabel label="Enter Dog name">
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    onChange={handleChange} 
                                    name='name'
                                    style={{ height: '50px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="formBasicBreed">
                            <FloatingLabel label="Enter Dog Breed">
                                <Form.Control
                                    type="text"
                                    placeholder="Breed"
                                    onChange={handleChange} 
                                    name='breed'
                                    style={{ height: '50px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="formBasicImage">
                            <FloatingLabel label="Enter Dog Image Link">
                                <Form.Control
                                    type="text"
                                    placeholder="Image"
                                    onChange={handleChange} 
                                    name='image_url'
                                    style={{ height: '50px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="formBasicAge">
                            <FloatingLabel label="Enter Dog Age">
                                <Form.Control
                                    type="text"
                                    placeholder="Age"
                                    onChange={handleChange} 
                                    name='age'
                                    style={{ height: '50px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="formBasicSize">
                            <Form.Select aria-label="Default select example" name='size' onChange={handleChange}>
                                    <option>What is the size of your dog?</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Big">Big</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="formBasicName">
                            <Form.Select aria-label="Default select example" name='gender' onChange={handleChange}>
                                    <option>What is the age of your dog?</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" color="primary" type="submit" style={{ padding: '10px', margin: '10px' }}>
                        {isLoading ? "Loading..." : "Create Dog Profile"}
                    </Button>
                </Form>
                    {errors.map((err) => (<h5 key={err}>{err}</h5>))}
            </Card> 
        </Container>     
    );
}

export default CreateDog;