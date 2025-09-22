import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const BasicExample= () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">carita.Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Beranda</Nav.Link>
            <Nav.Link href="#link">Profil</Nav.Link>
            <NavDropdown title="Portofolio" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Desain</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Video
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Foto</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;