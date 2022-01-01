import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';

import logoPict from '../assets/logo.png';

function AppNavbar() {
  return (
    <Navbar expand="xxl" fixed="top" bg="dark" variant="dark" className="py-1">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logoPict}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt={`${APP_ENV.APP_TITLE} Logo`}
        />
        {' '}
        {APP_ENV.APP_TITLE}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="AppNavbar" />
      <Navbar.Collapse id="AppNavbar">
        <Nav>
          <Nav.Link as={NavLink} to="/">Welcome</Nav.Link>
          <Nav.Link as={NavLink} to="/houses">Maisons</Nav.Link>
          <Nav.Link as={NavLink} to="/houses-resume">Résumé</Nav.Link>
          <Nav.Link as={NavLink} to="/interrogator">Interrogateur</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
