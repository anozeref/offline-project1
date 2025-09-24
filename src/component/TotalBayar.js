import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default class TotalBayar extends Component {
  bayarLangsung = () => {
    // langsung redirect ke Sukses.js
    this.props.history.push("/sukses");
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(
      (total, item) => total + item.total_harga,
      0
    );

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h5>Total Bayar: Rp. {totalBayar}</h5>
            <Button
              variant="primary"
              style={{ width: "100%" }}
              onClick={this.bayarLangsung}
              disabled={this.props.keranjangs.length === 0} // disable jika kosong
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Bayar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
