import React, { useState } from "react";
import {Button, Card, Form, Modal, FloatingLabel, Col, Row, Container} from 'react-bootstrap';
function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => {
            setErrors(err.errors)
            setShow(true)});
        }
      });
    }
  
    return (
        <Container>
            <h1 style={{ margin: '5% 25%' }}>LOGIN</h1>
            <Card style={{ padding: '25px', width: '50%', margin: '10% 25%' }}>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBasicUsername" xs={12} sm={12} md={12} lg={12} xl={12}> 
                            <FloatingLabel label="Enter Username">
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    name='username'
                                    style={{ height: '50px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBasicPaasword" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FloatingLabel label="Enter Password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    name='password'
                                    style={{ height: '50px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>

                    
                    <Button variant="dark" type="submit" style={{ padding: '10px', margin: '10px' }}>
                        {isLoading ? "Loading..." : "Login"}
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
                        Login Error
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errors.map((err) => (<h6 key={err}>{err}</h6>))}
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
  
  export default LoginForm;