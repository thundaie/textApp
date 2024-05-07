import { Navbar, Container, Nav, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">Chat App</Link>
        </h2>
        <span className="text-warning">Logged in as Mans</span>
        <Nav>
            <Stack direction="horizontal" gap={3}>
            <Link to="/login" className="link-light text-decoration-none">Log In</Link>
            <Link to="/signup" className="link-light text-decoration-none">Sign Up</Link>
            </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
