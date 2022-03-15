import React from 'react'
import {Navbar, Container ,Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">La bibliothèque</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav fill variant="tabs" defaultActiveKey="/searchBook">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/searchBook">Recherche d'ouvrages</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/returnBook">Retours d'emprunts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/livre">Gestion livres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/members">Gestion membres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/statistiques">Statistiques</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default NavBar