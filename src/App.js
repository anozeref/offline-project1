import logo from './logo.svg';
import './App.css';
import { Navbar, Category, Hasil } from "./component";
import { Container, Row, Col } from "react-bootstrap";
import ProductList from "./component/productlist";

function App() {
  return (
    <div>
      <Navbar />
      <Container>
      <Row>
        <Col><Category /></Col>
        <Col xs={6}><ProductList /></Col>
        <Col><Hasil /></Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
