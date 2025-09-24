import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-1">
        <h5><strong>Hasil</strong></h5>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item key={menuKeranjang.id}>
                <Row>
                  <Col xs={2}>
                    <Badge pill bg="success">{menuKeranjang.jumlah}</Badge>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col className="ms-auto text-end">
                    <strong>Total: Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {keranjangs.length !== 0 && <TotalBayar 
  keranjangs={keranjangs} 
  history={this.props.history} 
  {...this.props} 
/>
  }
      </Col>
    );
    
  }
}
