import React, { useState } from "react";
import {Button, Card, Form, Modal, FloatingLabel, Col, Row, Container} from 'react-bootstrap';

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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)

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
                setErrors([])
                setShow(true);});
          } else {
            r.json().then((err) => {
                setErrors(err.errors);
                setShow(true);});
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
                    <Button variant="dark" type="submit" style={{ padding: '10px', margin: '10px' }}>
                        {isLoading ? "Loading..." : "Create Dog Profile"}
                    </Button>
                </Form>
            </Card>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {errors[0] === undefined ? <>Submission Successful</> :
                        <>Error!!!</> }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errors[0] === undefined ? <>You have successfully submitted your dog for adoption!!!</> :
                        <>{errors.map((err) => (<h6 key={err}>{err}</h6>))}</> }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 
        </Container>     
    );
}

export default CreateDog;