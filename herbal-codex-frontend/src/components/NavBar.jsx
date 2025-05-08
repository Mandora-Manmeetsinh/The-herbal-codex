// src/components/Navbar.jsx
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">🌿 Herbal Codex</Navbar.Brand>
        <Navbar.Toggle aria-controls="herbal-navbar" />
        <Navbar.Collapse id="herbal-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            {/* <Nav.Link as={Link} to="/forum">Forum</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/shop">Shop</Nav.Link> */}
            <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
          </Nav>
          <Nav>
            {auth.user ? (
              <>
                <Navbar.Text className="me-3">Hello, {auth.user.name}</Navbar.Text>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar;
