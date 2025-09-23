import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FormatRupiah } from "./utils/utility";

function ProductList({ products, tambahKeranjang }) {
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={`/images/${item.category.nama.toLowerCase()}/${item.gambar}`}
                alt={item.nama}
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.nama}</Card.Title>
                <Card.Text className="mb-3">
                  Harga: {FormatRupiah(item.harga)}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => tambahKeranjang(item)}
                  className="mt-auto"
                >
                  + Tambah
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
