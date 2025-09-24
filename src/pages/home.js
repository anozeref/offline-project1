import { useState, useEffect } from "react";
import "../App.css";
import { Navbar, Category, Hasil, ProductList } from "../component";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../component/utils/constant";

function Home() {
  const [kategoriAktif, setKategoriAktif] = useState("");
  const [products, setProducts] = useState([]);
  const [keranjangs, setKeranjangs] = useState([]);
  const [showPesanan, setShowPesanan] = useState(false);
  const [pesananList, setPesananList] = useState([]);

  // Fetch produk sesuai kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = kategoriAktif
          ? await axios.get(`${API_URL}/product?category.nama=${kategoriAktif}`)
          : await axios.get(`${API_URL}/product`);
        setProducts(res.data);
      } catch (err) {
        console.error("Gagal fetch:", err);
      }
    };
    fetchData();
  }, [kategoriAktif]);

  // Tambah ke keranjang
  function tambahKeranjang(product) {
    setKeranjangs((prevKeranjang) => {
      const found = prevKeranjang.find((item) => item.product.id === product.id);
      if (found) {
        return prevKeranjang.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevKeranjang, { product, qty: 1 }];
      }
    });
  }

  // Kurangi qty
  function kurangiKeranjang(productId) {
    setKeranjangs((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  // Hapus item keranjang
  function hapusKeranjang(productId) {
    setKeranjangs((prev) => prev.filter((item) => item.product.id !== productId));
  }

  // Fetch pesanan dari DB
  async function fetchPesananList() {
    try {
      const res = await axios.get(`${API_URL}/pesanan`);
      setPesananList(res.data);
    } catch (err) {
      console.error("Gagal fetch pesanan:", err);
    }
  }

  // Handle show modal pesanan
  async function handleShowPesanan() {
    await fetchPesananList();
    setShowPesanan(true);
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col xs={2}>
            <Category
              kategoriAktif={kategoriAktif}
              changeCategory={setKategoriAktif}
            />
          </Col>

          <Col xs={7}>
            <ProductList products={products} tambahKeranjang={tambahKeranjang} />
          </Col>

          <Col xs={3}>
            <Hasil
              keranjangs={keranjangs}
              kurangiKeranjang={kurangiKeranjang}
              hapusKeranjang={hapusKeranjang}
              setKeranjangs={setKeranjangs}
              fetchPesananList={fetchPesananList}
            />
          </Col>
        </Row>
      </Container>

      {/* Floating Button untuk pesanan */}
      <Button
        variant="success"
        onClick={handleShowPesanan}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "20px",
        }}
      >
        📋
      </Button>

      {/* Modal Pesanan Grid */}
      <Modal
        show={showPesanan}
        onHide={() => setShowPesanan(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Daftar Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pesananList.length === 0 ? (
            <p>Belum ada pesanan.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {pesananList.map((order, idx) => (
                <div
                  key={order.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  <h6>
                    {idx + 1}. {order.atasNama}
                  </h6>
                  <p>
                    <strong>Tanggal:</strong>{" "}
                    {new Date(order.tanggal).toLocaleString()}
                  </p>
                  <div>
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <span>{item.product.nama}</span>
                        <span>Qty: {item.jumlah}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                    Total: Rp{" "}
                    {order.items
                      .reduce((sum, item) => sum + item.total_harga, 0)
                      .toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPesanan(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
