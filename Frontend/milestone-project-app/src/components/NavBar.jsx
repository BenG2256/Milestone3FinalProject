import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavBar() {
    return (
        <div id="App-header">
            <header >
                <a href="/">
                    <h1 className='App-header-text'>Rate A Restaurant 🍜</h1>
                </a>
                <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link id='login' className='App-header-text' href="/login">Login</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </header>
        </div>
    )
}




export default NavBar;
