import React from 'react';
import './scss/style.css';
import Map from './Map';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <a href="/">
          <h1>Map App</h1>
        </a>

        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="#link">Restaurant Listings</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>

      <Map />
    </div>
  );
}

export default App;
