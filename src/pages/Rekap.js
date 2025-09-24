import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Modal, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

export default class Rekap extends Component {
  state = {
    pesanan: [],
    loading: true,
    showModal: false,
    selectedPesanan: null,
  };

  componentDidMount() {
    this.getPesanan();
  }

  getPesanan = () => {
    axios.get(API_URL + "pesanan")
      .then(res => this.setState({ pesanan: res.data, loading: false }))
      .catch(err => this.setState({ loading: false }));
  };

  formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  backHome = () => {
    this.props.history.push("/");
  };

  openModal = (pesanan) => {
    this.setState({ showModal: true, selectedPesanan: pesanan });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedPesanan: null });
  };

  render() {
    const { pesanan, loading, showModal, selectedPesanan } = this.state;

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (pesanan.length === 0) return <p className="text-center mt-5">Belum ada pesanan</p>;

    return (
      <Container className="mt-4">
        <Button
          variant="primary"
          onClick={this.backHome}
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 1000,
            borderRadius: "50%",
            width: 50,
            height: 50,
            padding: 0,
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>

        <h3 className="mb-4 text-center">Rekap Transaksi</h3>
        <Row>
          {pesanan.map(p => (
            <Col md={4} sm={6} xs={12} className="mb-3" key={p.id}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>ID Pesanan: {p.id}</Card.Title>
                  <Card.Text>Total Bayar: Rp. {numberWithCommas(p.total_bayar)}</Card.Text>
                  <Card.Text>Jumlah Item: {p.menus.length}</Card.Text>
                  <Card.Text>Timestamp: {this.formatTimestamp(p.timestamp)}</Card.Text>
                  <Button variant="primary" onClick={() => this.openModal(p)}>
                    Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal Detail */}
        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Pesanan {selectedPesanan?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPesanan && (
              <ListGroup>
                {selectedPesanan.menus.map((m, idx) => (
                  <ListGroup.Item key={idx}>
                    {m.product.nama} x{m.jumlah} → Rp. {numberWithCommas(m.total_harga)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            {selectedPesanan && (
              <p className="mt-2">
                <strong>Total Bayar: Rp. {numberWithCommas(selectedPesanan.total_bayar)}</strong>
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
