import React from "react";
import { Col, Card } from "react-bootstrap";

const Menu = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`/images/${item.gambar}`}
          alt={item.nama}
        />
        <Card.Body>
          <Card.Title>{item.nama}</Card.Title>
          <Card.Text>
            Harga: Rp{item.harga.toLocaleString("id-ID")}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};


export default Menu;
