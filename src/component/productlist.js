import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {API_URL} from "./utils/constant";
import {FormatRupiah} from "./utils/utility";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/product`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Gagal fetch:", err));
  }, []);

  return (
    <Container>
      <h2 className="my-4">Daftar Produk</h2>
      <Row>
        {products.map((item) => (
          <Col key={item.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`/images/${item.gambar}`}
                alt={item.nama}
              />
              <Card.Body>
                <Card.Title>{item.nama}</Card.Title>
                <Card.Text>
                  Harga: {FormatRupiah(item.harga)} <br />
                  Kategori: {item.category.nama} <br />
                  {item.is_ready ? "Tersedia" : "Habis"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
