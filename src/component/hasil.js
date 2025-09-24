import React, { Component } from "react";
import { Badge, Col, ListGroup, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Hasil extends Component {

  handleKurang = (item) => {
    if (item.jumlah > 1) {
      const updated = {
        jumlah: item.jumlah - 1,
        total_harga: item.total_harga - item.product.harga,
        product: item.product
      };
      axios.put(API_URL + "keranjangs/" + item.id, updated)
        .then(() => this.props.getKeranjangs())
        .catch(err => console.log(err));
    } else {
      axios.delete(API_URL + "keranjangs/" + item.id)
        .then(() => this.props.getKeranjangs())
        .catch(err => console.log(err));
    }
  }

  handleTambah = (item) => {
    const updated = {
      jumlah: item.jumlah + 1,
      total_harga: item.total_harga + item.product.harga,
      product: item.product
    };
    axios.put(API_URL + "keranjangs/" + item.id, updated)
      .then(() => this.props.getKeranjangs())
      .catch(err => console.log(err));
  }

  render() {
    const { keranjangs } = this.props;

    return (
      <Col md={3} className="mt-1">
        <h5><strong>Hasil</strong></h5>
        <hr />

        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row className="align-items-center">
                  <Col xs={4} className="d-flex align-items-center">
                    <Button variant="danger" size="sm" onClick={() => this.handleKurang(item)}>-</Button>
                    <Badge pill bg="success" className="mx-2">{item.jumlah}</Badge>
                    <Button variant="success" size="sm" onClick={() => this.handleTambah(item)}>+</Button>
                  </Col>
                  <Col>
                    <h6>{item.product.nama}</h6>
                    <p className="mb-0">Rp. {numberWithCommas(item.product.harga)}</p>
                  </Col>
                  <Col className="ms-auto text-end">
                    <strong>Total: Rp. {numberWithCommas(item.total_harga)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {keranjangs.length !== 0 && 
          <TotalBayar 
            keranjangs={keranjangs} 
            history={this.props.history} 
            {...this.props} 
          />
        }
      </Col>
    );
  }
}
