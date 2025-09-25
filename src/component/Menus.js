import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import "./Menus.css";

const Menus = ({ menu, masukkeranjang }) => {
  const isOutOfStock = menu.stock === 0;

  return (
    <Col md={4} sm={6} xs={12} className="mb-4 fade-in-up">
      <Card
        className={`shadow ${isOutOfStock ? "inactive-card" : ""}`}
        onClick={() => {
          if (!isOutOfStock) masukkeranjang(menu);
        }}
        style={{
          width: "100%",
          cursor: isOutOfStock ? "not-allowed" : "pointer",
          opacity: isOutOfStock ? 0.5 : 1,
        }}
      >
        <Card.Img
          variant="top"
          src={`images/${menu.category.nama.toLowerCase()}/${menu.gambar}`}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            {menu.nama}
            <span
              style={{
                color:
                  menu.stock === 0
                    ? "red"
                    : menu.stock < 5
                    ? "orange"
                    : "gray",
              }}
            >
              Stock: {menu.stock}
            </span>
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
