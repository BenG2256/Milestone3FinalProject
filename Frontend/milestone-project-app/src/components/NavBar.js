import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/esm/NavItem';
import Dropdown from 'react-bootstrap/Dropdown';
import NavLink from 'react-bootstrap/NavLink';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from '../contexts/CurrentUser'

function NavBar() {
    const { currentUser } = useContext(CurrentUser)
    const navigation = useNavigate()

    let loginActions = (
        <>
            <Nav.Item>
                <Nav.Link className='App-header-text' href="" onClick={() => navigation("/signup")}>
                    Sign Up
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className='App-header-text' href="" onClick={() => navigation("/login")}>
                    Login
                </Nav.Link>
            </Nav.Item>
        </>
    )

    const handleLogout = async () => {
        await localStorage.clear();
        window.location.reload()
            ;
    }
    if (currentUser) {
        loginActions = (
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>{currentUser.username}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Nav.Link className='App-header-text' onClick={handleLogout}>
                            Logout
                        </Nav.Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>


        )
    }


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
                                {loginActions}
                                <Nav.Item>
                                    <Nav.Link className='App-header-text' href="" onClick={() => navigation("/")}>Home</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div >
    )

}




export default NavBar;
