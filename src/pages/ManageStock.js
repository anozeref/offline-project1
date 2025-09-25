// src/pages/ManageStock.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom"; // << v5 pakai ini
import { API_URL } from "../utils/constants";

export default function ManageStock() {
  const [products, setProducts] = useState([]);
  const [editingStock, setEditingStock] = useState({});
  const history = useHistory(); // << ganti useNavigate jadi useHistory

  // Ambil data produk
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}product`);
      setProducts(res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update stock (tetap sama seperti sebelumnya)
  const handleUpdateStock = async (id) => {
    const product = products.find((p) => p.id === id);
    const newStock = editingStock[id];
    const updated = { ...product, stock: parseInt(newStock, 10) || 0 };

    Swal.fire({
      title: "Yakin simpan perubahan?",
      text: `Stock baru: ${updated.stock}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${API_URL}product/${id}`, updated);

          setProducts((prev) =>
            prev.map((p) => (p.id === id ? updated : p))
          );

          setEditingStock((prev) => {
            const newEditing = { ...prev };
            delete newEditing[id];
            return newEditing;
          });

          Swal.fire({
            title: "Berhasil!",
            text: `Stock produk "${product.nama}" sekarang: ${updated.stock}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error("Gagal update stock:", err);
          Swal.fire("Error", "Gagal update stock", "error");
        }
      }
    });
  };

  return (
    <div className="p-4">
      {/* Tombol Back ke Home */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Stock</h3>
        <Button variant="secondary" onClick={() => history.push("/")}>
          ← Back to Home
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>Stock</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.kode}</td>
              <td>{prod.nama}</td>
              <td>
                <Form.Control
                  type="number"
                  value={
                    editingStock.hasOwnProperty(prod.id)
                      ? editingStock[prod.id]
                      : prod.stock
                  }
                  onChange={(e) =>
                    setEditingStock((prev) => ({
                      ...prev,
                      [prod.id]: e.target.value,
                    }))
                  }
                />
              </td>
              <td>
                <Button
                  size="sm"
                  variant="success"
                  className="me-2"
                  onClick={() => handleUpdateStock(prod.id)}
                >
                  Simpan
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
