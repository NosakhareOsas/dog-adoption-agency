import React, { useState } from "react";
import {Button, Card, Form, Modal, FloatingLabel, Col, Row, Container} from 'react-bootstrap';

function SignUpForm({ onLogin }){
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            surname,
            username,
            password,
            password_confirmation: passwordConfirmation,
            bio,
          }),
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
          <h1 style={{ margin: '5% 25%' }}>SIGN UP</h1>
          <Card style={{ padding: '25px'}}>
              <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                      <Form.Group as={Col} controlId="firstname" xs={12} sm={12} md={6} lg={6} xl={6}> 
                          <FloatingLabel label="Enter Firstname">
                              <Form.Control
                                  type="text"
                                  placeholder="Firstname"
                                  onChange={(e) => setFirstname(e.target.value)}
                                  name='firstname'
                                  style={{ height: '50px' }}
                              />
                          </FloatingLabel>
                      </Form.Group>
                      <Form.Group as={Col} controlId="surname" xs={12} sm={12} md={6} lg={6} xl={6}> 
                          <FloatingLabel label="Enter Surname">
                              <Form.Control
                                  type="text"
                                  placeholder="Surname"
                                  onChange={(e) => setSurname(e.target.value)}
                                  name='surname'
                                  style={{ height: '50px' }}
                              />
                          </FloatingLabel>
                      </Form.Group>
                  </Row>
                  <Row className="mb-3">
                      <Form.Group as={Col} controlId="username" xs={12} sm={12} md={6} lg={6} xl={6}> 
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
                      <Form.Group as={Col} controlId="bio" xs={12} sm={12} md={6} lg={6} xl={6}> 
                          <FloatingLabel label="Tell us about yourself">
                              <Form.Control
                                  type="textarea"
                                  placeholder="Bio"
                                  onChange={(e) => setBio(e.target.value)}
                                  name='bio'
                                  style={{ height: '50px' }}
                              />
                          </FloatingLabel>
                      </Form.Group>
                  </Row>
                  <Row className="mb-3">
                      <Form.Group as={Col} controlId="password" xs={12} sm={12} md={6} lg={6} xl={6}>
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
                      <Form.Group as={Col} controlId="password_confirmation" xs={12} sm={12} md={6} lg={6} xl={6}>
                          <FloatingLabel label="Confirm Password">
                              <Form.Control
                                  type="password"
                                  placeholder="Confirm Password"
                                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                                  name='password_confirmation'
                                  style={{ height: '50px' }}
                              />
                          </FloatingLabel>
                      </Form.Group>
                  </Row>
                  <Button variant="dark" type="submit" style={{ padding: '10px', margin: '10px' }}>
                      {isLoading ? "Loading..." : "Sign up"}
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


export default SignUpForm;