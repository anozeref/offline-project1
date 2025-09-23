import React, { useState } from "react";
import { Card, ListGroup, Button, Modal, Form, Image } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "./utils/constant";

export default function Hasil({ keranjangs, kurangiKeranjang, hapusKeranjang, setKeranjangs, fetchPesananList }) {
  const [showModal, setShowModal] = useState(false);
  const [atasNama, setAtasNama] = useState("");

  const totalHarga = keranjangs.reduce(
    (acc, item) => acc + item.product.harga * item.qty,
    0
  );

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  async function handleConfirm() {
    if (!atasNama) {
      alert("Nama pemesan harus diisi!");
      return;
    }

    const newOrder = {
      atasNama,
      tanggal: new Date().toISOString(),
      total: totalHarga,
      items: keranjangs.map((item) => ({
        id: item.product.id,
        jumlah: item.qty,
        total_harga: item.product.harga * item.qty,
        product: item.product
      }))
    };

    try {
      await axios.post(`${API_URL}/pesanan`, newOrder);
      alert("Pesanan berhasil disimpan!");

      setKeranjangs([]);   // kosongkan keranjang
      setAtasNama("");     // reset nama
      handleClose();       // tutup modal

      // refresh App.js pesananList supaya modal grid terbaru tampil
      if (typeof fetchPesananList === "function") {
        fetchPesananList();
      }
    } catch (err) {
      console.error("Gagal simpan pesanan:", err);
    }
  }

  return (
    <>
      {/* Card utama */}
      <Card>
        <Card.Header>
          <h5>Pesanan Anda</h5>
        </Card.Header>
        <ListGroup variant="flush">
          {keranjangs.map((item) => (
            <ListGroup.Item key={item.product.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.product.nama}</strong> <br />
                {item.qty} x Rp {item.product.harga}
              </div>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => kurangiKeranjang(item.product.id)}
                >
                  -
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => hapusKeranjang(item.product.id)}
                >
                  Hapus
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Footer className="d-flex justify-content-between align-items-center">
          <h6>Total: Rp {totalHarga}</h6>
          <Button variant="success" onClick={handleShow}>
            ✅ Konfirmasi
          </Button>
        </Card.Footer>
      </Card>

      {/* Modal Pop-up */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Pesanan</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h6>Ringkasan Keranjang</h6>
          <ListGroup variant="flush" className="mb-3">
            {keranjangs.map((item) => (
              <ListGroup.Item key={item.product.id} className="d-flex align-items-center">
                <Image
                  src={`/images/${item.product.category.nama.toLowerCase()}/${item.product.gambar}`}
                  alt={item.product.nama}
                  width={50}
                  height={50}
                  rounded
                  className="me-2"
                />
                <div>
                  <strong>{item.product.nama}</strong> <br />
                  {item.qty} x Rp {item.product.harga}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Form>
            <Form.Group>
              <Form.Label>Pesanan Untuk</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama pemesan"
                value={atasNama}
                onChange={(e) => setAtasNama(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <h6 className="me-auto">Total: Rp {totalHarga}</h6>
          <Button variant="secondary" onClick={handleClose}>
            Kembali
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            ✅ Konfirmasi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
