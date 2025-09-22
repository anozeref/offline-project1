import logo from './logo.svg';
import './App.css';
import { Navbar, Category, Hasil, Menu } from "./component";
import { Container, Row, Col } from "react-bootstrap";


function App() {
  return (
    <div>
      <Navbar />
      <Container>
      <Row>
        <Col><Category /></Col>
        <Col xs={6}><Menu /></Col>
        <Col><Hasil /></Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
