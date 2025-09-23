import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const BasicExample= () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">carita.Na RM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Selamat Datang</Nav.Link>
            <Nav.Link href="#link">Pesan</Nav.Link>
            <NavDropdown title="Layanan" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Kargo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Cash on Delivery
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Kasbon</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Daftar Cabang
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;