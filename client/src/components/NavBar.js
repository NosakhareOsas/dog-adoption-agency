import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar (){
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/" className="BrandName">ADOGT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">HOME</Nav.Link>
                    <Nav.Link href="/mydogs">MY DOGS</Nav.Link>
                    <Nav.Link href="/new">SUBMIT FOR ADOPTION</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>  
    )
}

export default NavBar;